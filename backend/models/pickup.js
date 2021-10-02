class Pickup {
    constructor(onBoardChange) {
        this.onBoardChange = onBoardChange
    }

    interact(token, tile) {
        let tileItem = tile.item

        if(tileItem) {
            token.pickupItem(tileItem)
            tile.item = null
            this.onBoardChange()
        }
    }
}

module.exports = {
    Pickup
}