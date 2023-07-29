const SelectionState = {
    INACTIVE: 0,
    ACTIVE: 1
}


class PortalSelector {
    constructor(portals) {
        this.state = SelectionState.INACTIVE
        this.selectedIndex = null
        this.selectablePortals = []
        this.portals = portals
    }

    isActive() {
        return this.state !== SelectionState.INACTIVE
    }

    handle(selectedToken, currPortal) {
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
    }

    select() {
        if(this.state === SelectionState.INACTIVE) {
            throw new Error('Cannot choose selection while not selecting')
        } else if(this.state === SelectionState.ACTIVE) {
            this.state = SelectionState.INACTIVE
            return this.selectablePortals[this.selectedIndex]
        }
        else {
            throw new Error('Cannot handle that state yet')
        }
    }
}

export { PortalSelector }