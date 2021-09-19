const { Board } = require('./board')
const { Coordinate } = require('./coordinate')
const { Token } = require('./token')

class Game {
    constructor(onBoardChange) {
        //likely should move where tokens are initialized
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

    move(player, movementVector) {
        const selectedToken = this.selectedTokens.get(player.id)
        if (selectedToken === null) {
            return
        }
        const token = this.tokens[selectedToken]
        const updatedCoord = this.board.move(token.coordinate, movementVector)
        token.coordinate = updatedCoord
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