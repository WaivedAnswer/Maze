import logger from './logger'

class GameService {

    constructor(gameId) {
        this.handlers = []
        this.gameId = gameId
        this.allowedMovements = []
    }

    addHandler(newHandler) {
        this.handlers = this.handlers.filter(handler => handler.id !== newHandler.id)
        this.handlers.push(newHandler)
    }

    connect() {
        return new Promise((resolve, reject) => {
            let websocketURL = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:3001' : 'wss://' + window.location.host
            this.connection = new WebSocket(websocketURL)
            logger.debug(websocketURL)
            this.connection.onopen = () => {
                resolve()
            }
            this.connection.onerror = (error) => {
                logger.error(error)
                logger.error('Sorry, but there\'s some problem with your '
                    + 'connection or the server is down.')
                    reject(error)
            }
            
            // most important part - incoming messages
            this.connection.onmessage = (message) => {
                try {
                    var json = JSON.parse(message.data);
                } catch (e) {
                   logger.error('Invalid JSON: ', message.data);
                    return
                }
            
                logger.debug("message gameId:" + typeof(json.gameId))
                logger.debug("service gameId:" + typeof(this.gameId))
                if(json.gameId && json.gameId !== this.gameId) {
                    return
                }

                for (let handler of this.handlers) {
                    handler.handle(json)
                }
            }
            setInterval(() => {
                if (this.connection.readyState !== 1) {
                    logger.error('Error missing connection');
                }
            }, 3000);
          });
       
    }

    getInitialUpdate() { 
        this.sendBasicCommand('INITIAL')
    }

    send(message) {
        let messageObject = JSON.parse(message)
        messageObject.gameId = this.gameId
        let gameMessage = JSON.stringify(messageObject)

        logger.debug("SEND: " + gameMessage)
        this.connection.send(gameMessage)
    }

    setMovements = (movements) => {
        this.allowedMovements = movements
    }
    
    sendBasicCommand = (command) => {
        this.send(JSON.stringify(
            {
                type: command
            }
        ))
    }
    
    sendMovement(command){
        if (!this.allowedMovements.includes(command)) {
            return
        }
        this.sendBasicCommand(command)
    }
    
    reset = () => {
        this.sendBasicCommand('RESET')
    }
    
    moveRight = () => {
       this.sendMovement('RIGHT')
    }
    
    moveLeft = () => {
        this.sendMovement('LEFT')
    }
    
    moveDown = () => {
        this.sendMovement('DOWN')
    }
    
    moveUp = () => {
        this.sendMovement('UP')
    }
    
    doSomething = (playerName) => {
        this.send(JSON.stringify(
            {
                type: 'DO-SOMETHING',
                player: playerName
            }
        ))
    }


}

export default GameService