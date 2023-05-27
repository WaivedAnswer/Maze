'use strict'

const http = require('http')
const express = require('express')
const webSocketServer = require('websocket').server

const config = require('./utils/config')
const logger = require('./utils/logger')
const { splitMoves } = require('./models/move')
const { Player } = require('./models/player')

const { Game } = require('./models/game')
const { GameManager } = require('./models/gameManager')
const { DIRECTIONS } = require('./models/direction')


const app = express()
app.use(express.static('build'))
app.use(express.json())

const players = []

const sendAll = (obj) => {
    for (var i = 0; i < players.length; i++) {
        players[i].send(obj)
    }
}

let game

let gameManager = new GameManager(sendAll)
app.post('/games', async (req, res) => {
    try {
        console.debug('Post: ' + req)
        // Create a new user with the data from the request body
        const randomId = Math.floor(Math.random() * 100000)
        game = await gameManager.createGame(randomId)

        // Send the new user's id as the response
        res.json({ gameId: game.getGameId() })
    } catch (error) {
        console.error(error)
        // If an error occurred, send it as the response
        res.status(500).json({ error: error.toString() })
    }
})

// eslint-disable-next-line no-unused-vars
const server = http.createServer(app)

server.listen(config.PORT, function () {
    logger.info(`${new Date()} Server is listening on port ${config.PORT}`)
})


const wsServer = new webSocketServer({
    httpServer: server
})

let nextPlayerId = 0
//potential hiccup with moving players
//when game is reset players will be reset as well (unless pass players somehow)


let remainingSeconds = 120
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


const updateMovements = (game, movements, dividingPlayers) => {
    //this should likely be moved to a player object concept
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



const reset = (gameId) => {
    gameManager.reset(gameId)
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

//reset()

wsServer.on('request', function (request) {
    logger.info('Request: ' + JSON.stringify(request))
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

    connection.on('message', function (message) {
        logger.debug('Received: ' + message)
        if (message.type === 'utf8') {
            logger.debug(`${new Date()} Received Message: ${message.utf8Data}`)
            let command
            try {
                command = JSON.parse(message.utf8Data)
            } catch (e) {
                logger.error(`Invalid JSON: ${message.utf8Data}, ${e}`)
                return
            }
            logger.debug('Message: ' + JSON.stringify(message))
            let gameId = Number(command.gameId)
            logger.debug('Game id:' + gameId)
            logger.debug(Object.keys(command))
            let game = gameManager._getGame(gameId)
            if (command.type === 'RESET') {
                reset(gameId)
            } else if (game.complete) {
                return
            } else if (command.type === 'INITIAL') {
                player.send({
                    type: 'name',
                    data: {
                        name: game.getPlayerName(player.id)
                    }
                })
                player.send(game.getBoardUpdate())
                player.send(getTimeMessage())
                updateMovements(game, DIRECTIONS, players)
            }
            else if (command.type === 'SELECTED') {
                //parseInt(this could come back as anything)
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
                game.move(player, command.type)
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
        //TODO how to figure out what game they left?
        //updateMovements(DIRECTIONS, players)
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
