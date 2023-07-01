const { Board } = require('./board')
const { Coordinate } = require('./coordinate')
const { Pickup } = require('./pickup')
const { Token } = require('./token')
const { splitMoves } = require('./move')
const { DIRECTIONS } = require('./direction')
const logger = require('../utils/logger')
const { BasicSectionProvider } = require('./factories/sectionProvider')
const { WallTileSectionProvider } = require('./factories/wallTileSectionProvider')
const { GameSectionProvider } = require('./factories/gameSectionProvider')

class Game {
    constructor(gameId) {
        this.gameId = gameId
        this.players = []
        this.onBoardChange = () => {
            this.sendGameMessage(this.getBoardUpdate())
        }
        this.onTimerFlip = () => {
            const oldSeconds = this.remainingSeconds
            const newSeconds = 120 - this.remainingSeconds
            logger.info('Timer Flip! Old: ' + oldSeconds + ' New: ' + newSeconds )
            this.remainingSeconds = newSeconds
        }
        this.reset()
    }

    doSomething(senderPlayerName, targetPlayerName) {
        const targetPlayer = this.players.find(p => p.getPlayerName() === targetPlayerName)
        targetPlayer.send({
            type: 'do-something',
            data: {
                sender: senderPlayerName
            }
        })
    }

    addPlayer(player) {
        this.players.push(player)
        player.send(this.getBoardUpdate())
        player.send(this.getTimeMessage())
        this.updateMovements()
    }

    removePlayer(playerName) {
        const removePlayerIndex = this.players.findIndex(p => p.getPlayerName() === playerName)
        if(removePlayerIndex === -1) {
            return
        }

        this.players.splice(removePlayerIndex, 1)
        this.updateMovements()
    }

    updateMovements() {
        //this should likely be moved to a player object concept
        const playerMoves = splitMoves(Object.keys(DIRECTIONS), this.players.length)
        for (let idx in playerMoves) {
            this.players[idx].send({
                type: 'movements',
                data: {
                    movements: playerMoves[idx]
                }
            })
        }
        const playerInfo = playerMoves.map((moves, idx) => {
            return {
                moves: moves,
                playerName: this.players[idx].getPlayerName()
            }
        })
        this.sendGameMessage({
            type: 'all-players',
            data: playerInfo
        })
    }

    getGameId() {
        logger.debug('Get gameId: ' + this.gameId)
        logger.debug('Game Id Type: ' + typeof(this.gameId) )
        return this.gameId
    }

    sendGameMessage(messageObj) {
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].send(messageObj, this.gameId)
        }
    }

    getTimeMessage () {
        return {
            type: 'timer-update',
            data: {
                seconds: this.remainingSeconds
            }
        }
    }

 
    getSectionProvider() {
        if(this.gameId.toUpperCase().endsWith('@OLD')) {
            return new WallTileSectionProvider()
        } else if(this.gameId.toUpperCase().endsWith('@BASIC')) {
            return new BasicSectionProvider()
        } else {
            return new GameSectionProvider()
        }
    }


    reset() {
        const sectionProvider = this.getSectionProvider()

        const tokenStarts = sectionProvider.getInitialTokenCoordinates()
        this.tokens = tokenStarts.map( startingCoord => new Token(startingCoord))
        this.selectedTokens = new Map()
        this.complete = false
        this.board = new Board(sectionProvider, this.onBoardChange)
        this.pickup = new Pickup(this.onBoardChange, this.onTimerFlip)
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
        for (const playerName of this.selectedTokens.keys()) {
            selections.push({
                selection: this.selectedTokens.get(playerName),
                selectedBy: playerName
            })
        }
        return selections
    }

    move(player, movementCommand) {
        const token = this.getSelectedToken(player)
        if(!token) {
            logger.debug('Trying to move with no selected token?')
            return
        }
        const updatedCoord = this.board.move(token, movementCommand)
        token.coordinate = updatedCoord
        this.onMove(token, this.board)
    }

    getSelectedToken(player) {
        const selectedIndex = this.selectedTokens.get(player.getPlayerName())
        if (selectedIndex === null) {
            return null
        }

        return this.tokens[selectedIndex]
    }

    teleport(player, viewCoord) {
        const token = this.getSelectedToken(player)
        if(!token) {
            logger.debug('Trying to teleport with no selected token?')
            return
        }

        const gameCoord = new Coordinate(viewCoord.x, viewCoord.y).offset(this.board.getMinCoordinate())
        const updatedCoord = this.board.teleport(token, gameCoord)
        token.coordinate = updatedCoord
        this.onMove(token, this.board)
    }

    escalate(player, escalatorId) {
        const token = this.getSelectedToken(player)
        if(!token) {
            logger.debug('Trying to teleport with no selected token?')
            return
        }

        const updatedCoord = this.board.escalate(token, escalatorId)
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

    select(playerName, selection) {
        //set from the outside
        //this might need some validation (ie selection cannot be greater than indexes of tokens)
        //also selections are currently not cleaned up
        if(selection > this.tokens.length || selection < 0) {
            logger.error(`Error: Tried to set ${selection} as selection`)
        }
        this.selectedTokens.set(playerName, selection)
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
        const allItems = this.board.allItemsCollected()
        const allEscaped = this.tokens.every(tokenCoord => this.board.isEscaped(tokenCoord))
        return  allItems && allEscaped
    }

    getTokenData() {
        return {
            tokens: this.tokens.map(token => token.getPos(this.board.getMinCoordinate())),
            selections: this.getSelections()
        }
    }

    getPlayerNameFromIndex(index){
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