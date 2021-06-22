const logger = require('./../utils/logger')

class Player {
    constructor(connection) {
        this.connection = connection
    }

    send(obj) {
        const json = JSON.stringify(obj)
        logger.info(json)
        this.connection.sendUTF(json)
    }
}

module.exports = {
    Player
}