const { Section } = require('./section')
const { Offset } = require('./offset')
const { Tile, TileType } = require('./tile')
const { Coordinate } = require('./coordinate')
const { Escalator } = require('./escalator')
const { PortalManager } = require('./portalManager')
const { DIRECTIONS } = require('./direction')
const { Item, ItemType } = require('./item')

//deals with section coordinates and section connections
class Board {
    constructor(dimensions, onBoardChange) {
        this.sectionCount = 2
        this.sectionDimensions = dimensions
        this.sections = []
        this.portalManager = new PortalManager()
        this.onBoardChange = onBoardChange
        this.addSection(new Offset(0, 0), false)
    }

    createSection(id, offset, exit) {
        const section = new Section(id, this.sectionDimensions,
            offset)
        if(exit) {
            section.addTile(new Tile(exit, TileType.EXIT))
        }

        section.addWall(new Coordinate(0, 0), new Coordinate(2, 0))
        section.addWall(new Coordinate(3, 0), new Coordinate(10, 0))
        section.addWall(new Coordinate(10, 0), new Coordinate(10, 5))
        section.addWall(new Coordinate(10, 6), new Coordinate(10, 10))

        section.addWall(new Coordinate(0, 0), new Coordinate(0, 10))
        section.addWall(new Coordinate(0, 10), new Coordinate(10, 10))

        section.addWall(new Coordinate(0, 5), new Coordinate(this.sectionDimensions - 2, 5))

        section.addWall(new Coordinate(0, 1), new Coordinate(4, 1))

        section.addWall(new Coordinate(1, 7), new Coordinate(6, 7))

        section.addWall(new Coordinate(1, 3), new Coordinate(6, 3))

        section.addWall(new Coordinate(6, 0), new Coordinate(6, 3))

        section.addWall(new Coordinate(6, 7), new Coordinate(6, this.sectionDimensions))

        section.addWall(new Coordinate(8, 1), new Coordinate(8, this.sectionDimensions - 1))

        /*for (let i = 0; i < this.sectionDimensions - 1; i++) {
            section.addWallTile(new Coordinate(i, 5))
        }

        for (let i = 0; i < 4; i++) {
            section.addWallTile(new Coordinate(i, 1))
        }

        for (let i = 1; i < 6; i++) {
            section.addWallTile(new Coordinate(i, 7))
        }

        for (let i = 1; i < 6; i++) {
            section.addWallTile(new Coordinate(i, 3))
        }

        for (let j = 0; j < 3; j++) {
            section.addWallTile(new Coordinate(5, j))
        }

        for (let j = 7; j < this.sectionDimensions; j++) {
            section.addWallTile(new Coordinate(6, j))
        }

        for (let j = 1; j < this.sectionDimensions - 1; j++) {
            section.addWallTile(new Coordinate(8, j))
        }*/


        section.addTile(new Tile(new Coordinate(4,0), TileType.NORMAL, new Item(ItemType.COIN)))
        section.addTile(new Tile(new Coordinate(6,0), TileType.NORMAL, new Item(ItemType.TIMER)))
        section.addTile(new Tile(new Coordinate(7,4), TileType.PORTAL))
        section.addEscalator(new Escalator(new Coordinate(6, 3), new Coordinate(9, 2)))

        return section
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
        const escalator = section.escalators[Number(escalatorIndex)]
        const otherEnd = escalator.getOtherEnd(token.coordinate)
        if(!otherEnd) {
            return token.coordinate
        }
        return otherEnd
    }

    addSection(offset) {
        const isLast = this.sections.length + 1 >= this.sectionCount
        const exit = isLast ? new Coordinate(9,5) : null
        let newSection = this.createSection(this.sections.length,
            offset,
            exit)
        this.sections.push(newSection)

        let newPortals = newSection.getTilesOfType(TileType.PORTAL, new Coordinate(0, 0))
        for(const portal of newPortals) {
            this.portalManager.trackPortal(portal)
        }
    }

    allSectionsRevealed() {
        return this.sectionCount === this.sections.length
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