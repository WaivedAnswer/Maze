import logger from './logger'

class GameService {

    constructor() {
        let websocketURL = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:3001' : 'wss://' + window.location.host
        this.handlers = []
        this.allowedMovements = []
        this.connection = new WebSocket(websocketURL)
        logger.debug(websocketURL)
        this.connection.onopen = () => {
            logger.debug('Opened!')
        }
        this.connection.onerror = (error) => {
            logger.error(error)
            logger.error('Sorry, but there\'s some problem with your '
                + 'connection or the server is down.')
        }
        
        // most important part - incoming messages
        this.connection.onmessage = (message) => {
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
               logger.error('Invalid JSON: ', message.data);
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
    }

    addHandler(newHandler) {
        this.handlers = this.handlers.filter(handler => handler.id !== newHandler.id)
        this.handlers.push(newHandler)
    }

    send(message) {
        logger.debug("SEND:" + message)
        this.connection.send(message)
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