const { Board } = require('./board')
const { TileType } = require('./tile')
const { Coordinate } = require('./coordinate')
const { Pickup } = require('./pickup')
const { State } = require('./gameState')
const { splitMoves } = require('./move')
const { DIRECTIONS } = require('./direction')
const logger = require('../utils/logger')
const { GameSectionProvider } = require('./factories/gameSectionProvider')



class Game {
    constructor(gameId) {
        this.gameId = gameId
        this.players = []
        this.onBoardChange = () => {
            this.sendGameMessage(this.getBoardUpdate())
        }
        this.onTimerFlip = () => {
            const newSeconds = 120 - this.remainingSeconds
            this.remainingSeconds = newSeconds
            this.updateMovements()
        }
        this.onPickupWeapon = () => {
            this.pickupAllWeapons()
        }
        this.onAllSectionsRevealed = () => {
            this.allSectionsRevealed()
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

    isCompleted() {
        return this.state.isCompleted()
    }

    allSectionsRevealed() {
        this.state.allSectionsRevealed()
    }

    reset() {
        this.sectionProvider = new GameSectionProvider()
        this.state = new State()
        this.tokens = this.sectionProvider.getTokens()
        this.selectedTokens = new Map()
        this.board = new Board(this.sectionProvider, this.onBoardChange, this.onAllSectionsRevealed)
        this.pickup = new Pickup(this.onBoardChange, this.onTimerFlip, this.onPickupWeapon)
        this.remainingSeconds = 120
        clearInterval(this.timerInterval)
        this.timerInterval = setInterval(() => {
            if (this.remainingSeconds === 0) {
                this.state.timesUp()
                clearInterval(this.timerInterval)
                this.sendGameMessage({
                    type: 'lose'
                })
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
            logger.debug('Trying o move with no selected token?')
            return
        }
        const updatedCoord = this.board.move(token, movementCommand)
        this.onMove(token, this.board, updatedCoord)
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
        this.onMove(token, this.board, updatedCoord)
    }

    escalate(player) {
        const token = this.getSelectedToken(player)
        if(!token) {
            logger.debug('Trying to teleport with no selected token?')
            return
        }

        const updatedCoord = this.board.escalate(token)
        this.onMove(token, this.board, updatedCoord)

    }

    updateTokens() {
        this.sendGameMessage({
            type: 'token-update',
            data: this.getTokenData()
        })
    }

    pickupAllWeapons() {
        if(!this.board.allSectionsRevealed()) {
            return
        }
        this.pickup.pickupAllWeapons(this.tokens, this.tokens.map( token => this.board.getTile(token.coordinate)))
        if(this.board.allItemsCollected()) {
            this.state.weaponsStolen()
            this.board.disablePortals()
        }
    }

    onMove(token, board, updatedCoords) {
        if(this.tokens.filter(token => !token.escaped)
            .some(otherToken => otherToken.coordinate.getKey() === updatedCoords.getKey())) {
            return
        }
        token.coordinate = updatedCoords
        const tile = board.getTile(token.coordinate)

        //can refactor escape logic to pickup interaction
        this.pickup.interact(token, tile)
        if(tile.type === TileType.EXIT && token.type === tile.tokenType && this.state.canEscape()) {
            token.escape()
            if(this.allEscaped()) {
                this.state.escaped()
                this.sendGameMessage({
                    type: 'win'
                })
                clearInterval(this.timerInterval)
            }
        }
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

    allEscaped() {
        return this.tokens.every(tokenCoord => this.board.isEscaped(tokenCoord))
    }

    getTokenData() {
        return {
            tokens: this.tokens.map(token => token.getTokenData(this.board.getMinCoordinate())),
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
                tokenData: this.getTokenData(),
                remainingSections: this.sectionProvider.remaining,
                state: this.state.state
            }
        }
    }
}

module.exports = {
    Game
}