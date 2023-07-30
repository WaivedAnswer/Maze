const SelectionState = {
    INACTIVE: 0,
    ACTIVE: 1
}


class PortalSelector {
    constructor(portals) {
        this.resetSelection()
        this.portals = portals
    }

    resetSelection() {
        this.state = SelectionState.INACTIVE
        this.selectedIndex = null
        this.selectablePortals = []
    }

    isActive() {
        return this.state !== SelectionState.INACTIVE
    }

    handle(selectedToken, currPortal, scrollToTile) {
        if(selectedToken.type !== currPortal.tokenType) {
            return
        }

        if(this.state === SelectionState.INACTIVE) {
            //initial selection
            this.selectedIndex = 0
            this.selectablePortals = this.portals.filter( portal => portal.tokenType === selectedToken.type && portal !== currPortal)
            this.state = SelectionState.ACTIVE
        } else if(this.state === SelectionState.ACTIVE) {
            this.selectedIndex = (this.selectedIndex + 1) % this.selectablePortals.length
        } else {
            throw new Error('Cannot handle that state yet')
        }
        if(this.selectablePortals.length) {
            const newSelection = this.selectablePortals[this.selectedIndex]
            scrollToTile(newSelection.coord)
        }
    }

    select() {
        if(this.state === SelectionState.INACTIVE) {
            throw new Error('Cannot choose selection while not selecting')
        } else if(this.state === SelectionState.ACTIVE) {
            const selection = this.selectablePortals[this.selectedIndex]
            this.resetSelection()
            return selection
        }
        else {
            throw new Error('Cannot handle that state yet')
        }
    }

    cancel() {
        if(this.state === SelectionState.ACTIVE) {
            this.resetSelection()
        }
    }
}

export { PortalSelector }