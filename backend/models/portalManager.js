
class PortalManager {
    constructor() {
        this.portals = []
    }

    trackPortal(portal) {
        this.portals.push(portal)
        console.log(JSON.stringify(this.portals))
    }

    teleport(selectedToken, portalCoord) {
        const tokenCoordinate = selectedToken.coordinate
        const selectedPortal = this.portals.find(portal => portal.coord.getKey() === portalCoord.getKey())
        if(!selectedPortal) {
            return tokenCoordinate
        }
        const currPortal = this.portals.find(portal => portal.coord.getKey() === tokenCoordinate.getKey())
        if(!currPortal) {
            return tokenCoordinate
        }

        const portalsMatch = currPortal.tokenType === selectedPortal.tokenType
        const tokenCanPassPortals = selectedToken.type === currPortal.tokenType
        if( portalsMatch && tokenCanPassPortals) {
            return portalCoord
        }
        return tokenCoordinate
    }
}

module.exports = {
    PortalManager
}