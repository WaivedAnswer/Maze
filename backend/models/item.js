
class Item {
    constructor(type, tokenType) {
        this.type = type
        this.tokenType = tokenType
    }

    getData() {
        return {
            type: this.type,
            tokenType: this.tokenType
        }
    }
}

const ItemType = {
    COIN: 0,
    TIMER: 1,
    WEAPON: 2
}

module.exports = {
    Item,
    ItemType
}