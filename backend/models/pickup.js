class Pickup {
    constructor() {
    }

    interact(token, tile) {
        let tileItem = tile.item
        if(tileItem) {
            token.pickupItem(tileItem)
            tile.item = null
        }
    }
}

module.exports = {
    Pickup
}