const TokenType = {
    DWARF: 1,
    MAGE: 2,
    BARBARIAN: 3,
    ELF: 4
}

class Token {
    constructor(id, coord, selections, escaped, type) {
        this.id = id
        this.coord = coord
        this.selections = selections
        this.escaped = escaped
        this.type = type
    }

    isMySelection() {
        return this.selections.find(selection => selection.isSelf)
    }
}

export { Token, TokenType }