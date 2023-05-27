const { Game } = require('./game')
const logger = require('../utils/logger')

class GameManager {
    constructor() {
        this.games = []
    }

    createGame(gameId) {
        logger.debug('Create: ' + gameId)
        let game = new Game(gameId)
        this.games.push(game)
        return game
    }

    reset(gameId) {
        let game = this._getGame(gameId)
        game.reset()
    }

    _getGame(gameId) {
        let game = this.games.find(game => game.getGameId() === gameId)
        if(!game) {
            logger.warn('Failed to retrieve game with gameID: ' + gameId)
        }
        return game
    }
}

module.exports = {
    GameManager
}