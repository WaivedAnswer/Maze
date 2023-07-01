const { Offset } = require('./offset')
const { TileType } = require('./tile')
const { Coordinate } = require('./coordinate')
const { PortalManager } = require('./portalManager')
const { DIRECTIONS } = require('./direction')

//deals with section coordinates and section connections
class Board {
    constructor(sectionProvider, onBoardChange) {
        this.sections = []
        this.sectionProvider = sectionProvider
        this.portalManager = new PortalManager()
        this.onBoardChange = onBoardChange
        this.addSection(new Offset(0, 0), false)
    }

    getMinCoordinate() {
        const offsetX = this.sections.map(section => section.offset.x)
        const minOffsetX = Math.min(...offsetX)
        const offsetY = this.sections.map( section => section.offset.y)
        const minOffsetY = Math.min(...offsetY)
        return new Coordinate(minOffsetX, minOffsetY)
    }

    getMaxCoordinate() {
        const height = Math.max(...this.sections.map(section => section.getMaxDimensions(this.getMinCoordinate()).height))
        const width =  Math.max(...this.sections.map(section => section.getMaxDimensions(this.getMinCoordinate()).width))
        return new Coordinate(width, height)
    }

    getData() {
        return {
            tiles: this.getAllData(),
            escalators: this.getEscalatorData(),
            walls: this.getWallData()
        }
    }

    getEscalatorData() {
        const minCoordinate = this.getMinCoordinate()
        return this.sections.flatMap(section => section.getEscalatorData(minCoordinate))
    }

    getWallData() {
        const minCoordinate = this.getMinCoordinate()
        return this.sections.flatMap(section => section.getWallData(minCoordinate))
    }


    getAllData() {
        let minCoordinate = this.getMinCoordinate()
        let maxCoordinate = this.getMaxCoordinate()
        const allTiles = []
        for (let y = minCoordinate.y; y < maxCoordinate.y; y++) {
            let row = []
            for (let x = minCoordinate.x; x < maxCoordinate.x; x++) {
                const currCoord = new Coordinate(x, y)
                const currTile = this.getTile(currCoord)
                const originBasedCoord = currCoord.relativeTo(minCoordinate)
                if(currTile) {
                    let tileData = {
                        pos: originBasedCoord.getPos(),
                        type: currTile.type,
                        hasItem: currTile.hasItem()
                    }
                    if(currTile.hasItem()) {
                        tileData.item = currTile.item.getData()
                    }
                    row.push(tileData)
                } else {
                    row.push({
                        pos: originBasedCoord.getPos(),
                        type: -1,
                        hasItem: false
                    })
                }

            }
            allTiles.push(row)
        }
        return allTiles
    }

    allItemsCollected() {
        return this.sections.every(section => section.allItemsCollected())
    }

    getTile(coord) {
        const currSection = this.getCurrSection(coord)
        if(!currSection) {
            return null
        }
        return currSection.getTile(coord)
    }

    move(token, movementCommand) {
        const movementVector = DIRECTIONS[movementCommand]

        const currCoord = token.coordinate
        const updatedCoord = currCoord.offset(movementVector)
        const currSection = this.getCurrSection(updatedCoord)
        if(!currSection || !currSection.canMoveV2(currCoord, updatedCoord)) {
            return currCoord
        }

        const connectionOffset = currSection.getConnectingOffset(updatedCoord)
        
        if (!connectionOffset || this.allSectionsRevealed()) {
            return updatedCoord
        }

        this.addSection(connectionOffset)
        currSection.connectAt(updatedCoord)
        this.onBoardChange()
        return updatedCoord
    }

    teleport(token, newCoord) {
        return this.portalManager.teleport(token, newCoord)
    }

    escalate(token, escalatorId) {
        const [sectionId, escalatorIndex] = escalatorId.split('-')
        const section = this.sections[Number(sectionId)]
        return section.escalate(token, escalatorIndex)
    }

    addSection(offset) {
        console.log('Adding!')
        let newSection =  this.sectionProvider.createSection(this.sections.length, offset)
        this.sections.push(newSection)

        let newPortals = newSection.getTilesOfType(TileType.PORTAL, new Coordinate(0, 0))
        for(const portal of newPortals) {
            this.portalManager.trackPortal(portal)
        }
    }

    allSectionsRevealed() {
        return this.sectionProvider.remaining <= 0
    }

    isEscaped(token) {
        const currSection = this.getCurrSection(token.coordinate)
        return currSection.isAtExit(token.coordinate)
    }

    getCurrSection(coord) {
        return this.sections.find(section => section.inBounds(coord))
    }
}

module.exports = {
    Board
}