'use strict'

const http = require('http')
const express = require('express')
const webSocketServer = require('websocket').server

const config = require('./utils/config')
const logger = require('./utils/logger')
const { Player } = require('./models/player')

const { GameManager } = require('./models/gameManager')
const { DIRECTIONS } = require('./models/direction')


const app = express()
app.use(express.static('build'))
app.use(express.json())


let gameManager = new GameManager()

app.post('/games', async (req, res) => {
    try {
        logger.debug('Post: ' + JSON.stringify(req.body))
        // Create a new user with the data from the request body
        const gameId = req.body.gameId
        let game = await gameManager.createGame(gameId)

        // Send the new user's id as the response
        res.json({ gameId: game.getGameId() })
    } catch (error) {
        logger.error(error)
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


wsServer.on('request', function (request) {
    logger.info(`${new Date()} Connection from origin ${request.origin}.`)

    const connection = request.accept(null, request.origin)

    //TODO find a new way to limit player count
    /*if (players.length >= Object.keys(DIRECTIONS).length) {
        return
    }*/


    // we need to know client index to remove them on 'close' event
    const playerId = nextPlayerId++
    const player = new Player(connection, playerId)

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
            let gameId = command.gameId
            logger.debug('Game id:' + gameId)
            logger.debug(Object.keys(command))
            let game = gameManager._getGame(gameId)
            if (command.type === 'RESET') {
                game.reset()
            } else if (game.complete) {
                return
            } else if (command.type === 'INITIAL') {
                game.addPlayer(player)
            }
            else if (command.type === 'SELECTED') {
                //parseInt(this could come back as anything)
                game.select(player.id, parseInt(command.selected))
            } else if (command.type === 'DO-SOMETHING') {
                game.doSomething(player.id, command.player)
            } else if (command.type in DIRECTIONS) {
                game.move(player, command.type)
            }

            game.updateTokens()
            checkWin(game)
        }
    })

    // user disconnected
    connection.on('close', function (connection) {
        logger.info(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)
        /*const removeIndex = players.findIndex(player => player.id === playerId)
        players.splice(removeIndex, 1)*/ //TODO remove player
        //TODO how to figure out what game they left?
        //updateMovements(DIRECTIONS, players)
    })
})



function checkWin(game) {
    game.checkWin()
}
