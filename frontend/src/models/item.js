let ItemType = {
    COIN: 0,
    TIMER: 1
}

class Item {
    constructor(type) {
        this.type = type
    }
}

export { Item, ItemType }