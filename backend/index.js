'use strict'
const config = require('./utils/config')
const logger = require('./utils/logger')
const webSocketServer = require('websocket').server
const http = require('http')

const sampleSize = require('lodash.samplesize')

const { Coordinate } = require('./models/coordinate')

const clients = []

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


/**
 * HTTP server
 */
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

const send = (obj) => {
    const json = JSON.stringify(obj)
    logger.info(json)
    for (var i = 0; i < clients.length; i++) {
        clients[i].sendUTF(json)
    }
}

const updateTokens = () => {
    var messageData = {
        time: (new Date()).getTime(),
        tokens: tokens.map(token => token.getPos())
    }

    // broadcast message to all connected clients
    send({
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


// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function (request) {
    logger.info(`${new Date()} Connection from origin ${request.origin}.`)
    const connection = request.accept(null, request.origin)

    // we need to know client index to remove them on 'close' event
    const index = clients.push(connection) - 1

    logger.info(`${new Date()} Connection accepted.`)

    send({
        type: 'board-update',
        data: {
            height: dimensions,
            width: dimensions,
            tokens: tokens.map(token => token.getPos()),
            exit: exit.getPos()
        }
    })

    connection.send(JSON.stringify({
        type: 'movements',
        data: {
            movements: sampleSize(Object.keys(movementCommands), 3)
        }
    }))

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

            logger.info(`Client count is: ${clients.length}`)
            updateTokens()
            checkWin()
        }
    })
    // user disconnected
    connection.on('close', function (connection) {
        logger.info(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)

        clients.splice(index, 1)
    })
})

function checkWin() {
    const tokenExit = (token) => {
        return token.x === exit.x && token.y === exit.y
    }

    if (tokens.every(token => tokenExit(token))) {
        send({
            type: 'win'
        })
        complete = true
    }
}
