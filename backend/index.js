'use strict'

const http = require('http')
const express = require('express')
const webSocketServer = require('websocket').server

const config = require('./utils/config')
const logger = require('./utils/logger')
const { Coordinate } = require('./models/coordinate')
const { SectionCoordinate } = require('./models/sectionCoordinate')
const { splitMoves } = require('./models/move')
const { Player } = require('./models/player')
const { Board } = require('./models/board')


let nextPlayerId = 0
const players = []

const getMovementVector = (x, y) => {
    return {
        x: x,
        y: y
    }
}

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


let complete
let tokenCoords
let selected
let selectedTokens
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

const getSelections = () => {
    const selections = []
    for (const idx of selectedTokens.keys()) {
        selections.push({
            selection: selectedTokens.get(idx),
            selectedBy: getPlayerName(idx)
        })
    }
    return selections
}

const getTokenData = () => {
    return {
        tokens: tokenCoords.map(token => token.coordinate.getPos()),
        selectedTokens: [...selectedTokens.values()],
        selections: getSelections()
    }
}

const updateTokens = () => {
    sendAll({
        type: 'token-update',
        data: getTokenData()
    })
}

const movementCommands = {
    'RIGHT': getMovementVector(1, 0),
    'LEFT': getMovementVector(-1, 0),
    'UP': getMovementVector(0, -1),
    'DOWN': getMovementVector(0, 1)
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
            playerName: getPlayerName(dividingPlayers[idx].id)
        }
    })
    sendAll({
        type: 'all-players',
        data: playerInfo
    })
}

const getPlayerName = (index) => {
    return `Player ${index + 1}`
}

const getBoardUpdate = () => {
    return {
        type: 'board-update',
        data: {
            board: board.getData(),
            tokenData: getTokenData()
        }
    }
}

const onBoardChange = () => {
    sendAll(getBoardUpdate())
}
const board = new Board(10, onBoardChange)

const reset = () => {
    //likely should move where tokens are initialized
    tokenCoords = [new SectionCoordinate(0, new Coordinate(0, 0)), new SectionCoordinate(0, new Coordinate(5, 9))]
    complete = false
    selected = 0
    selectedTokens = new Map()
    remainingSeconds = 120
    sendAll(getTimeMessage())
    board.reset()
    clearInterval(timerInterval)
    timerInterval = setInterval(() => {
        if (remainingSeconds === 0) {
            clearInterval(timerInterval)
            sendAll({
                type: 'lose'
            })
            complete = true
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

    if (players.length >= Object.keys(movementCommands).length) {
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
            name: getPlayerName(player.id)
        }
    })

    player.send(getBoardUpdate())

    player.send(getTimeMessage())



    updateMovements(movementCommands, players)

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
            } else if (complete) {
                return
            } else if (command.type === 'SELECTED') {
                selected = parseInt(command.selected)
                selectedTokens.set(player.id, selected)
            } else if (command.type === 'DO-SOMETHING') {
                const targetPlayer = players.find(p => getPlayerName(p.id) === command.player)
                targetPlayer.send({
                    type: 'do-something',
                    data: {
                        sender: getPlayerName(player.id)
                    }
                })
            } else if (command.type in movementCommands) {
                const selectedToken = selectedTokens.get(player.id)
                if (selectedToken === null) {
                    return
                }
                const movementVector = movementCommands[command.type]
                const tokenCoord = tokenCoords[selectedToken]
                tokenCoords[selectedToken] = board.move(tokenCoord, movementVector)
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
        updateMovements(movementCommands, players)
    })
})



function checkWin() {

    if (tokenCoords.every(tokenCoord => board.isAtExit(tokenCoord))) {
        sendAll({
            type: 'win'
        })
        complete = true
        clearInterval(timerInterval)
    }
}
