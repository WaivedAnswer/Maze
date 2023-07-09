let ItemType = {
    COIN: 0,
    TIMER: 1,
    WEAPON: 2
}

class Item {
    constructor(type, tokenType) {
        this.type = type
        this.tokenType = tokenType
    }
}

export { Item, ItemType }