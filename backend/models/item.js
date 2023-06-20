
class Item {
    constructor(type) {
        this.type = type
    }

    getData() {
        return {
            type: this.type
        }
    }
}

const ItemType = {
    COIN: 0,
    TIMER: 1
}

module.exports = {
    Item,
    ItemType
}