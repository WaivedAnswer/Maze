'use strict'
const config = require('./utils/config')
const logger = require('./utils/logger')
const webSocketServer = require('websocket').server
const http = require('http')

const clients = []


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

    // if (history.length > 0) {
    //     connection.sendUTF(
    //         JSON.stringify({ type: 'history', data: history }))
    // }
    // user sent some message
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            logger.info(`${new Date()} Received Message: ${message.utf8Data}`)

            var obj = {
                time: (new Date()).getTime(),
                newSelectedId: (message.utf8Data),
            }

            // broadcast message to all connected clients
            send({
                type: 'selected-id',
                data: obj
            })

            const range = Math.ceil(Math.random() * 20)
            logger.info(range)
            const tiles = [...Array(range).keys()]
            logger.info(tiles)

            send({
                type: 'board-update',
                data: {
                    tiles: tiles
                }
            })
        }
    })
    // user disconnected
    connection.on('close', function (connection) {
        logger.info(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)

        clients.splice(index, 1)
    })
})