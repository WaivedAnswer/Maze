const { ItemType } = require('./item')
class Pickup {
    constructor(onBoardChange, onFlipTimer) {
        this.onBoardChange = onBoardChange
        this.onFlipTimer = onFlipTimer
    }

    interact(token, tile) {
        let tileItem = tile.item

        if(tileItem && ( tileItem.tokenType === token.type || !tileItem.tokenType )) {
            token.pickupItem(tileItem)
            tile.item = null
            if(tileItem.type === ItemType.TIMER) {
                this.onFlipTimer()
            }
            this.onBoardChange()
        }
    }
}

module.exports = {
    Pickup
}