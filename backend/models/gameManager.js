const { Game } = require('./game')
const logger = require('../utils/logger')

class GameManager {
    constructor() {
        this.games = []
    }

    createGame(gameId, isTutorial) {
        logger.debug('Create: ' + gameId)
        let game = new Game(gameId, isTutorial)
        this.games.push(game)
        return game
    }

    removePlayer(playerName) {
        for(const game of this.games){
            game.removePlayer(playerName)
        }
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