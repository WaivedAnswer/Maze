const { Game } = require('./game')
const logger = require('../utils/logger')

class GameManager {
    constructor(sendAll) {
        this.games = []
        this.sendAll = sendAll
    }

    createGame(gameId) {
        logger.debug('Create: ' + gameId)
        let game = new Game(gameId, this.sendAll)
        this.games.push(game)
        logger.debug('Games: ' + JSON.stringify(this.games))
        return game
    }

    reset(gameId) {
        let game = this._getGame(gameId)
        game.reset()
    }

    _getGame(gameId) {
        logger.debug('Get game: ' + gameId)
        logger.debug('Parameter Type: ' + typeof(gameId) )
        let game = this.games.find(game => game.getGameId() === gameId)
        logger.debug('Retrieved Game: ' + JSON.stringify(game))
        return game
    }
}

module.exports = {
    GameManager
}