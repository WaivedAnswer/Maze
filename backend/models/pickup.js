const { ItemType } = require('./item')
class Pickup {
    constructor(onBoardChange, onFlipTimer, onInteractWeapon) {
        this.onBoardChange = onBoardChange
        this.onFlipTimer = onFlipTimer
        this.onInteractWeapon = onInteractWeapon
    }

    canPickup(token, tileItem) {
        return tileItem && ( tileItem.tokenType === token.type || !tileItem.tokenType )
    }

    takeItem(token, tile) {
        token.pickupItem(tile.item)
        tile.item = null
    }

    interact(token, tile) {
        let tileItem = tile.item
        if(this.canPickup(token, tileItem)) {
            switch(tileItem.type) {
            case ItemType.TIMER:
                this.takeItem(token, tile)
                this.onFlipTimer()
                break
            case ItemType.WEAPON:
                this.onInteractWeapon()
                break
            default:
                this.takeItem(token, tile)
            }
            this.onBoardChange()
        }
    }

    pickupAllWeapons(tokens, tiles) {
        const allTokensReady = tokens.every( (token, i) => this.canPickup(token, tiles[i].item))
        if(!allTokensReady) {
            return
        }
        for(let i = 0; i < tokens.length; i++) {
            this.takeItem(tokens[i], tiles[i])
        }
    }
}

module.exports = {
    Pickup
}