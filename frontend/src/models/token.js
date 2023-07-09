const TokenType = {
    DWARF: 1,
    MAGE: 2,
    BARBARIAN: 3,
    ELF: 4
}

class Token {
    constructor(id, coord, selectedBy, escaped, type) {
        this.id = id
        this.coord = coord
        this.selectedBy = selectedBy
        this.escaped = escaped
        this.type = type
    }
}

export { Token, TokenType }