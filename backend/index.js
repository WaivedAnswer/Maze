'use strict'
const config = require('./utils/config')
const logger = require('./utils/logger')
const webSocketServer = require('websocket').server
const http = require('http')

const clients = []

const dimensions = 10
const inBounds = (selected) => {
    return selected >= 0 && selected < dimensions
}


const getPos = (xVal, yVal) => {
    return {
        x: xVal,
        y: yVal
    }
}


let complete = false

let selectedY = 0
let selectedX = 0

const reset = () => {
    selectedX = 0
    selectedY = 0
    complete = false
}

let exit = getPos(0, 7)


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
            pos: getPos(selectedX, selectedY),
            exit: exit
        }
    })

    connection.on('message', function (message) {
        logger.info(message)
        if (message.type === 'utf8') {
            logger.info(`${new Date()} Received Message: ${message.utf8Data}`)
            if (message.utf8Data === 'RESET') {
                reset()
            }

            if (complete) {
                return
            }

            if (message.utf8Data === 'UP') {
                const updatedPos = selectedY - 1
                if (inBounds(updatedPos)) {
                    selectedY = updatedPos
                }
            } else if (message.utf8Data === 'DOWN') {
                const updatedPos = selectedY + 1
                if (inBounds(updatedPos)) {
                    selectedY = updatedPos
                }
            } else if (message.utf8Data === 'LEFT') {
                const updatedPos = selectedX - 1
                if (inBounds(updatedPos)) {
                    selectedX = updatedPos
                }
            } else if (message.utf8Data === 'RIGHT') {
                const updatedPos = selectedX + 1
                if (inBounds(updatedPos)) {
                    selectedX = updatedPos
                }
            }

            const currPos = getPos(selectedX, selectedY)

            var obj = {
                time: (new Date()).getTime(),
                pos: currPos
            }

            // broadcast message to all connected clients
            send({
                type: 'selected-id',
                data: obj
            })

            if (currPos.x === exit.x && currPos.y === exit.y) {
                send({
                    type: 'win'
                })
                complete = true
            }
        }
    })
    // user disconnected
    connection.on('close', function (connection) {
        logger.info(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)

        clients.splice(index, 1)
    })
})