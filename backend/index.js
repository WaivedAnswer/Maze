'use strict'

const http = require('http')
const express = require('express')
const webSocketServer = require('websocket').server

const config = require('./utils/config')
const logger = require('./utils/logger')
const { splitMoves } = require('./models/move')
const { Player } = require('./models/player')

const { Game } = require('./models/game')

const { DIRECTIONS } = require('./models/direction')


let nextPlayerId = 0
const players = []

const app = express()
app.use(express.static('build'))

// eslint-disable-next-line no-unused-vars
const server = http.createServer(app)

server.listen(config.PORT, function () {
    logger.info(`${new Date()} Server is listening on port ${config.PORT}`)
})


const wsServer = new webSocketServer({
    httpServer: server
})

const sendAll = (obj) => {
    for (var i = 0; i < players.length; i++) {
        players[i].send(obj)
    }
}

let game
let remainingSeconds
var timerInterval

const getTimeMessage = () => {
    return {
        type: 'timer-update',
        data: {
            seconds: remainingSeconds
        }
    }
}

const updateTokens = () => {
    sendAll({
        type: 'token-update',
        data: game.getTokenData()
    })
}


const updateMovements = (movements, dividingPlayers) => {
    const playerMoves = splitMoves(Object.keys(movements), dividingPlayers.length)
    for (let idx in playerMoves) {
        dividingPlayers[idx].send({
            type: 'movements',
            data: {
                movements: playerMoves[idx]
            }
        })
    }
    const playerInfo = playerMoves.map((moves, idx) => {
        return {
            moves: moves,
            playerName: game.getPlayerName(dividingPlayers[idx].id)
        }
    })
    sendAll({
        type: 'all-players',
        data: playerInfo
    })
}

const onBoardChange = () => {
    sendAll(game.getBoardUpdate())
}

const reset = () => {
    //likely should move where tokens are initialized
    game = new Game(onBoardChange)
    remainingSeconds = 120
    sendAll(getTimeMessage())
    clearInterval(timerInterval)
    timerInterval = setInterval(() => {
        if (remainingSeconds === 0) {
            clearInterval(timerInterval)
            sendAll({
                type: 'lose'
            })
            game.complete = true
        }
        if (remainingSeconds > 0) {
            remainingSeconds -= 1
            sendAll(getTimeMessage())
        }
    }, 1000)
}

reset()

wsServer.on('request', function (request) {
    logger.info(`${new Date()} Connection from origin ${request.origin}.`)

    const connection = request.accept(null, request.origin)

    if (players.length >= Object.keys(DIRECTIONS).length) {
        return
    }


    // we need to know client index to remove them on 'close' event
    const playerId = nextPlayerId++
    const player = new Player(connection, playerId)
    players.push(player) - 1

    logger.info(`${new Date()} Connection accepted.`)

    player.send({
        type: 'name',
        data: {
            name: game.getPlayerName(player.id)
        }
    })

    player.send(game.getBoardUpdate())
    player.send(getTimeMessage())


    updateMovements(DIRECTIONS, players)

    connection.on('message', function (message) {
        logger.info(message)
        if (message.type === 'utf8') {
            logger.info(`${players.length} players`)
            logger.info(`${new Date()} Received Message: ${message.utf8Data}`)

            let command
            try {
                command = JSON.parse(message.utf8Data)
            } catch (e) {
                logger.error(`Invalid JSON: ${message.utf8Data}, ${e}`)
                return
            }

            if (command.type === 'RESET') {
                reset()
            } else if (game.complete) {
                return
            } else if (command.type === 'SELECTED') {
                game.select(player.id, parseInt(command.selected))
            } else if (command.type === 'DO-SOMETHING') {
                const targetPlayer = players.find(p => game.getPlayerName(p.id) === command.player)
                targetPlayer.send({
                    type: 'do-something',
                    data: {
                        sender: game.getPlayerName(player.id)
                    }
                })
            } else if (command.type in DIRECTIONS) {
                const selectedToken = game.selectedTokens.get(player.id)
                if (selectedToken === null) {
                    return
                }
                const movementVector = DIRECTIONS[command.type]
                const tokenCoord = game.tokenCoords[selectedToken]
                game.tokenCoords[selectedToken] = game.board.move(tokenCoord, movementVector)
            }

            updateTokens()
            checkWin()
        }
    })

    // user disconnected
    connection.on('close', function (connection) {
        logger.info(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)
        const removeIndex = players.findIndex(player => player.id === playerId)
        players.splice(removeIndex, 1)
        updateMovements(DIRECTIONS, players)
    })
})



function checkWin() {
    if (game.checkWin()) {
        sendAll({
            type: 'win'
        })
        game.complete = true
        clearInterval(timerInterval)
    }
}
