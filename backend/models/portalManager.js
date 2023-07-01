
class PortalManager {
    constructor() {
        this.portals = []
    }

    trackPortal(portalCoords) {
        this.portals.push(portalCoords)
    }

    teleport(selectedToken, portalCoord) {
        const tokenCoordinate = selectedToken.coordinate
        const validPortal = this.portals.some(portal => portal.getKey() === portalCoord.getKey())
        const onPortal = this.portals.some(portal => portal.getKey() === tokenCoordinate.getKey())
        if( validPortal && onPortal) {
            return portalCoord
        }
        return tokenCoordinate
    }
}

module.exports = {
    PortalManager
}