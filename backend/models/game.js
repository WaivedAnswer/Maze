const { Board } = require('./board')
const { Coordinate } = require('./coordinate')
const { Pickup } = require('./pickup')
const { Token } = require('./token')

class Game {
    constructor(onBoardChange) {
        this.tokens = [new Token(new Coordinate(0, 0)), new Token(new Coordinate(5, 9))]
        this.selectedTokens = new Map()
        this.complete = false
        this.board = new Board(10, onBoardChange)
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

        const selectedIndex = this.selectedTokens.get(player.id)
        if (selectedIndex === null) {
            return
        }
        const token = this.tokens[selectedIndex]
        const updatedCoord = this.board.move(token, movementCommand)
        token.coordinate = updatedCoord

        this.onMove(token, this.board)
    }

    onMove(token, board) {
        const tile = board.getTile(token.coordinate)
        new Pickup().interact(token, tile)
    }

    select(playerId, selection) {
        this.selectedTokens.set(playerId, selection)
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

    checkWin() {
        return this.tokens.every(tokenCoord => this.board.isEscaped(tokenCoord))
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