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

        const gameId = req.body.gameId
        let game = await gameManager.createGame(gameId)

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

//potential hiccup with moving players
//when game is reset players will be reset as well (unless pass players somehow)


wsServer.on('request', function (request) {
    const playerName = request.resourceURL.query.playerName
    logger.info(`${new Date()} Connection from origin ${request.origin}. Player Name: ${playerName}`)
    const connection = request.accept(null, request.origin)

    //TODO find a new way to limit player count
    /*if (players.length >= Object.keys(DIRECTIONS).length) {
        return
    }*/


    // we need to know client index to remove them on 'close' event
    const player = new Player(connection, playerName)

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
            if(!game) {
                return
            }
            if (command.type === 'RESET') {
                game.reset()
            } else if (game.isCompleted()) {
                return
            } else if (command.type === 'INITIAL') {
                game.addPlayer(player)
            }
            else if (command.type === 'SELECTED') {
                game.select(player.getPlayerName(), parseInt(command.selected))
            } else if (command.type === 'DO-SOMETHING') {
                game.doSomething(player.getPlayerName(), command.player)
            } else if (command.type in DIRECTIONS) {
                game.move(player, command.type)
            } else if (command.type === 'TELEPORT') {
                game.teleport(player, command.coord)
            } else if (command.type === 'ESCALATE') {
                game.escalate(player)
            }

            game.updateTokens()
        }
    })

    // user disconnected
    connection.on('close', function () {
        logger.info(`${new Date()} Player ${playerName} disconnected. `)
        //probably need to find a better way to do this, this is asymmetrical. Directly adding to the game, but removing through game manager
        gameManager.removePlayer(playerName)
    })
})
