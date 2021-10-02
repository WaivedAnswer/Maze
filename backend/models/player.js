const logger = require('./../utils/logger')

class Player {
    constructor(connection, id) {
        this.connection = connection
        this.id = id
    }

    send(obj) {
        const json = JSON.stringify(obj)
        this.connection.sendUTF(json)
    }
}

module.exports = {
    Player
}