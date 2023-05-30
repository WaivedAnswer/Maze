const logger = require('./../utils/logger')

class Player {
    constructor(connection, name) {
        this.connection = connection
        this.name = name
    }

    send(obj, gameId) {
        obj.gameId = gameId
        const json = JSON.stringify(obj)
        logger.debug('Send Player: ' + json )
        this.connection.sendUTF(json)
    }

    getPlayerName() {
        return this.name
    }
}

module.exports = {
    Player
}