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
        this.addSection(new Offset(0, 0), DIRECTIONS.UP)
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
                        hasItem: currTile.hasItem(),
                        tokenType: currTile.tokenType
                    }
                    if(currTile.hasItem()) {
                        tileData.item = currTile.item.getData()
                    }
                    row.push(tileData)
                } else {
                    row.push({
                        pos: originBasedCoord.getPos(),
                        type: -1,
                        hasItem: false,
                        tokenType: null
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

    updateSections(currSection, updatedCoord, selectedToken) {
        const currTile = currSection.getTile(updatedCoord)
        if(!currTile.type === TileType.CONNECT ) {
            return
        }
        else if( currTile.tokenType !== selectedToken.type ) {
            return
        }

        const [connectionOffset, direction] = currSection.getConnectingOffset(updatedCoord)
        if (!connectionOffset) {
            return
        } else if (this.allSectionsRevealed()) {
            return
        }

        const connectingCoords = new Coordinate(0,0).offset(connectionOffset)
        const alreadyConnected = this.getCurrSection(connectingCoords) !== undefined
        if ( alreadyConnected ) {
            return
        }
        this.addSection(connectionOffset, direction)
        currSection.connectAt(updatedCoord)
        this.onBoardChange()
    }

    move(token, movementCommand) {
        const movementVector = DIRECTIONS[movementCommand]

        const currCoord = token.coordinate
        const updatedCoord = currCoord.offset(movementVector)
        const currSection = this.getCurrSection(updatedCoord)
        if(!currSection || !currSection.canMoveV2(currCoord, updatedCoord)) {
            return currCoord
        }

        this.updateSections(currSection, updatedCoord, token)
        return updatedCoord
    }

    teleport(token, newCoord) {
        return this.portalManager.teleport(token, newCoord)
    }

    escalate(token, escalatorId) {
        const [sectionId, escalatorIndex] = escalatorId.split('-')
        const section = this.sections[Number(sectionId)]
        if(section !== this.getCurrSection(token.coordinate)) {
            return token.coordinate
        }
        const updatedCoord = section.escalate(token, escalatorIndex)
        this.updateSections(section, updatedCoord, token)
        return updatedCoord
    }

    addSection(offset, direction) {
        const id = this.sections.length
        const newSection =  this.sectionProvider.createSection(id, offset, direction)
        this.sections.push(newSection)

        let newPortals = newSection.getPortals(new Coordinate(0, 0))
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