'use strict'

const http = require('http')
const webSocketServer = require('websocket').server

const config = require('./utils/config')
const logger = require('./utils/logger')
const { Coordinate } = require('./models/coordinate')
const { splitMoves } = require('./models/move')
const { Player } = require('./models/player')

const players = []

const dimensions = 10
const inBounds = (selected) => {
    return selected >= 0 && selected < dimensions
}

let complete
let tokens
let selected

const getMovementVector = (x, y) => {
    return {
        x: x,
        y: y
    }
}

const reset = () => {
    tokens = [new Coordinate(0, 0), new Coordinate(9, 9)]
    complete = false
    selected = 0
}

let exit = new Coordinate(0, 7)

reset()



// eslint-disable-next-line no-unused-vars
const server = http.createServer(function (ignoredRequest, _response) {
    // Not important for us. We're writing WebSocket server,
    // not HTTP server
})

server.listen(config.PORT, function () {
    logger.info(`${new Date()} Server is listening on port ${config.PORT}`)
})


const wsServer = new webSocketServer({
    httpServer: server
})

const sendAll = (obj) => {
    logger.info(obj)
    for (var i = 0; i < players.length; i++) {
        players[i].send(obj)
    }
}



const updateTokens = () => {
    var messageData = {
        time: (new Date()).getTime(),
        tokens: tokens.map(token => token.getPos())
    }

    sendAll({
        type: 'selected-id',
        data: messageData
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
}


wsServer.on('request', function (request) {
    logger.info(`${new Date()} Connection from origin ${request.origin}.`)

    const connection = request.accept(null, request.origin)

    if (players.length >= Object.keys(movementCommands).length) {
        return
    }


    // we need to know client index to remove them on 'close' event
    const player = new Player(connection)
    const index = players.push(player) - 1

    logger.info(`${new Date()} Connection accepted.`)

    player.send({
        type: 'board-update',
        data: {
            height: dimensions,
            width: dimensions,
            tokens: tokens.map(token => token.getPos()),
            exit: exit.getPos()
        }
    })

    updateMovements(movementCommands, players)

    connection.on('message', function (message) {
        logger.info(message)
        if (message.type === 'utf8') {
            logger.info(`${new Date()} Received Message: ${message.utf8Data}`)

            let command
            try {
                command = JSON.parse(message.utf8Data)
            } catch (e) {
                logger.error(`Invalid JSON: ${message.utf8Data}, ${e}`)
                return
            }

            const selectedToken = selected

            if (command.type === 'RESET') {
                reset()
            } else if (complete) {
                return
            } else if (command.type === 'SELECTED') {
                selected = parseInt(command.selected)
            } else if (command.type in movementCommands) {
                const movementVector = movementCommands[command.type]
                const tokenPos = tokens[selectedToken]
                const updatedX = tokenPos.x + movementVector.x
                const updatedY = tokenPos.y + movementVector.y
                if (inBounds(updatedX) && inBounds(updatedY)) {
                    tokens[selectedToken] = new Coordinate(updatedX, updatedY)
                }
            }

            logger.info(`Player count is: ${players.length}`)
            updateTokens()
            checkWin()
        }
    })

    // user disconnected
    connection.on('close', function (connection) {
        logger.info(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)
        players.splice(index, 1)
        updateMovements(movementCommands, players)
    })
})

function checkWin() {
    const tokenExit = (token) => {
        return token.x === exit.x && token.y === exit.y
    }

    if (tokens.every(token => tokenExit(token))) {
        sendAll({
            type: 'win'
        })
        complete = true
    }
}
