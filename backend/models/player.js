const logger = require('./../utils/logger')

class Player {
    constructor(connection, id) {
        this.connection = connection
        this.id = id
    }

    send(obj, gameId) {
        obj.gameId = gameId
        const json = JSON.stringify(obj)
        logger.debug('Send Player: ' + json )
        this.connection.sendUTF(json)
    }
}

module.exports = {
    Player
}