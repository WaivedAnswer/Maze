const { Board } = require('./board')
const { Coordinate } = require('./coordinate')
const { Pickup } = require('./pickup')
const { Token } = require('./token')
const logger = require('../utils/logger')

class Game {
    constructor(gameId, sendAll) {
        this.gameId = gameId
        this.sendAll = sendAll
        this.onBoardChange = () => {
            this.sendGameMessage(this.getBoardUpdate())
        }
        this.reset()
    }

    getGameId() {
        logger.debug('Get gameId: ' + this.gameId)
        logger.debug('Game Id Type: ' + typeof(this.gameId) )
        return this.gameId
    }

    sendGameMessage(messageObj) {
        this.sendAll(messageObj, this.gameId)
    }

    getTimeMessage () {
        return {
            type: 'timer-update',
            data: {
                seconds: this.remainingSeconds
            }
        }
    }


    reset() {
        this.tokens = [new Token(new Coordinate(0, 0)), new Token(new Coordinate(5, 9))]
        this.selectedTokens = new Map()
        this.complete = false
        this.board = new Board(10, this.onBoardChange)
        this.pickup = new Pickup(this.onBoardChange)
        this.remainingSeconds = 120
        clearInterval(this.timerInterval)
        this.timerInterval = setInterval(() => {
            if (this.remainingSeconds === 0) {
                clearInterval(this.timerInterval)
                this.sendGameMessage({
                    type: 'lose'
                })
                this.complete = true
            }
            if (this.remainingSeconds > 0) {
                this.remainingSeconds -= 1
                this.sendGameMessage(this.getTimeMessage())
            }
        }, 1000)
        this.sendGameMessage(this.getTimeMessage(this.getRemainingSeconds()))
        this.onBoardChange()
    }

    getRemainingSeconds() {
        return this.remainingSeconds
    }


    getSelections() {
        const selections = []
        for (const idx of this.selectedTokens.keys()) {
            selections.push({
                selection: this.selectedTokens.get(idx),
                selectedBy: this.getPlayerName(idx)
            })
        }
        return selections
    }

    move(player, movementCommand) {
        //likely a bad selectedIndex ( how is this manipulated?), non null
        const selectedIndex = this.selectedTokens.get(player.id)
        if (selectedIndex === null) {
            return
        }
        //either a null token in the array, or accessing the array out of bounds
        const token = this.tokens[selectedIndex]
        const updatedCoord = this.board.move(token, movementCommand)
        token.coordinate = updatedCoord

        this.onMove(token, this.board)
    }

    updateTokens() {
        this.sendGameMessage({
            type: 'token-update',
            data: this.getTokenData()
        })
    }

    onMove(token, board) {
        const tile = board.getTile(token.coordinate)
        this.pickup.interact(token, tile)
    }

    select(playerId, selection) {
        //set from the outside
        //this might need some validation (ie selection cannot be greater than indexes of tokens)
        //also selections are currently not cleaned up
        if(selection > this.tokens.length || selection < 0) {
            logger.error(`Error: Tried to set ${selection} as selection`)
        }
        this.selectedTokens.set(playerId, selection)
    }

    checkWin() {
        if (this.didWin()) {
            this.sendGameMessage({
                type: 'win'
            })
            this.complete = true
            clearInterval(this.timerInterval)
        }
    }

    didWin() {
        return this.board.allItemsCollected() && this.tokens.every(tokenCoord => this.board.isEscaped(tokenCoord))
    }

    getTokenData() {
        return {
            tokens: this.tokens.map(token => token.getPos(this.board.getMinCoordinate())),
            selections: this.getSelections()
        }
    }

    getPlayerName(index){
        return `Player ${index + 1}`
    }



    getBoardUpdate() {
        return {
            type: 'board-update',
            data: {
                board: this.board.getData(),
                tokenData: this.getTokenData()
            }
        }
    }
}

module.exports = {
    Game
}