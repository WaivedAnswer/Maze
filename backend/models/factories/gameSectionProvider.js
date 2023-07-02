const { Section } = require('../section')
const { Tile, TileType } = require('../tile')
const { Coordinate } = require('../coordinate')
const { Escalator } = require('../escalator')
const { Item, ItemType } = require('../item')
const { Connection, getConnectionCoordinate } = require('../connection')
const { DIRECTIONS } = require('../direction')
const { getRotatedCoord, getRotatedWallCoord, getRotatedDirection } = require('../rotations')

const FIRST = {
    items: [{ type: ItemType.TIMER, coord: { x: 0, y: 0 } }],
    connections: [
        DIRECTIONS.UP,
        DIRECTIONS.LEFT,
        DIRECTIONS.RIGHT,
        DIRECTIONS.DOWN],
    portals: [
        { coord: { x: 3, y: 0 } },
        { coord: { x: 3, y: 1 } },
        { coord: { x: 0, y: 2 } },
        { coord: { x: 0, y: 3 } }],
    walls: [
        { start: { x: 0, y: 1 }, end: { x: 1, y: 1 } },
        { start: { x: 3, y: 1 }, end: { x: 4, y: 1 } },
        { start: { x: 3, y: 2 }, end: { x: 4, y: 2 } },
        { start: { x: 3, y: 2 }, end: { x: 3, y: 4 } },
        { start: { x: 0, y: 2 }, end: { x: 1, y: 2 } },
        { start: { x: 0, y: 3 }, end: { x: 1, y: 3 } },
        { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }],
    escalators: [{ start: { x: 2, y: 3 }, end: { x: 3, y: 2 } }],
    barriers: [ { coord: { x: 3, y: 3 } }]
}

const SECOND = {
    items: [],
    connections: [
        DIRECTIONS.LEFT],
    portals: [
        { coord: { x: 0, y: 3 } },
        { coord: { x: 2, y: 3 } }],
    walls: [
        { start: { x: 0, y: 1 }, end: { x: 3, y: 1 } },
        { start: { x: 2, y: 0 }, end: { x: 3, y: 0 } },
        { start: { x: 1, y: 3 }, end: { x: 1, y: 4 } }
    ],
    escalators: [{ start: { x: 0, y: 1 }, end: { x: 2, y: 0 } }],
    barriers: [
        { coord: { x: 0, y: 0 } },
        { coord: { x: 1, y: 0 } },
        { coord: { x: 1, y: 1 } },
        { coord: { x: 2, y: 1 } },
        { coord: { x: 3, y: 1 } },
        { coord: { x: 2, y: 2 } },
        { coord: { x: 3, y: 2 } },
        { coord: { x: 3, y: 3 } },
    ],
    exit: { coord: { x: 3, y: 0 } }
}

const THIRD = {
    items: [{ type: ItemType.TIMER, coord: { x: 0, y: 2 } }],
    connections: [
        DIRECTIONS.LEFT,
        DIRECTIONS.RIGHT
    ],
    portals: [
        { coord: { x: 2, y: 0 } },
        { coord: { x: 3, y: 1 } }],
    walls: [
        { start: { x: 1, y: 1 }, end: { x: 1, y: 2 } },
        { start: { x: 0, y: 2 }, end: { x: 1, y: 2 } },
        { start: { x: 2, y: 2 }, end: { x: 4, y: 2 } },
        { start: { x: 2, y: 0 }, end: { x: 2, y: 1 } },
        { start: { x: 0, y: 3 }, end: { x: 2, y: 3 } },
    ],
    escalators: [],
    barriers: [
        { coord: { x: 0, y: 3 } },
        { coord: { x: 3, y: 3 } },
        { coord: { x: 3, y: 0 } },
    ]
}

const FOURTH = {
    items: [{ type: ItemType.TIMER, coord: { x: 1, y: 1 } }],
    connections: [
        DIRECTIONS.UP,
        DIRECTIONS.RIGHT
    ],
    portals: [
        { coord: { x: 0, y: 2 } },
        { coord: { x: 3, y: 0 } }],
    walls: [
        { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
    ],
    escalators: [],
    barriers: [
        { coord: { x: 0, y: 0 } },
        { coord: { x: 1, y: 0 } },
        { coord: { x: 0, y: 1 } },
        { coord: { x: 3, y: 1 } },
        { coord: { x: 0, y: 3 } },
        { coord: { x: 2, y: 3 } },
        { coord: { x: 3, y: 3 } },
    ]
}

const FIFTH = {
    items: [{ type: ItemType.TIMER, coord: { x: 2, y: 1 } }],
    connections: [
        DIRECTIONS.LEFT,
        DIRECTIONS.UP,
        DIRECTIONS.RIGHT
    ],
    portals: [
        { coord: { x: 0, y: 2 } },],
    walls: [
        { start: { x: 2, y: 0 }, end: { x: 2, y: 2 } },
        { start: { x: 2, y: 1 }, end: { x: 3, y: 1 } },
        { start: { x: 3, y: 1 }, end: { x: 3, y: 2 } },
        { start: { x: 0, y: 3 }, end: { x: 2, y: 3 } },
        { start: { x: 0, y: 2 }, end: { x: 1, y: 2 } },
        { start: { x: 1, y: 1 }, end: { x: 1, y: 2 } },
    ],
    escalators: [],
    barriers: [
        { coord: { x: 0, y: 3 } },
        { coord: { x: 3, y: 3 } },
    ]
}

const SIXTH = {
    items: [{ type: ItemType.COIN, coord: { x: 3, y: 2 } }],
    connections: [
        DIRECTIONS.LEFT,
        DIRECTIONS.UP
    ],
    portals: [
        { coord: { x: 0, y: 3 } },],
    walls: [
        { start: { x: 0, y: 2 }, end: { x: 2, y: 2 } },
    ],
    escalators: [],
    barriers: [
        { coord: { x: 0, y: 0 } },
        { coord: { x: 1, y: 0 } },
        { coord: { x: 0, y: 2 } },
        { coord: { x: 2, y: 3 } },
        { coord: { x: 3, y: 3 } },
        { coord: { x: 3, y: 0 } },
        { coord: { x: 3, y: 1 } },
    ]
}

const SEVENTH = {
    items: [{ type: ItemType.COIN, coord: { x: 0, y: 2 } }],
    connections: [
        DIRECTIONS.RIGHT
    ],
    portals: [
        { coord: { x: 2, y: 0 } },
        { coord: { x: 3, y: 3 } },
    ],
    walls: [
    ],
    escalators: [{ start: { x: 1, y: 3 }, end: { x: 2, y: 1 } }],
    barriers: [
        { coord: { x: 0, y: 0 } },
        { coord: { x: 1, y: 0 } },
        { coord: { x: 3, y: 0 } },
        { coord: { x: 1, y: 2 } },
        { coord: { x: 2, y: 2 } },
        { coord: { x: 0, y: 3 } },
        { coord: { x: 2, y: 3 } },
    ]
}

const EIGHTH = {
    items: [{ type: ItemType.COIN, coord: { x: 0, y: 3 } }],
    connections: [
        DIRECTIONS.RIGHT,
        DIRECTIONS.LEFT
    ],
    portals: [
        { coord: { x: 2, y: 1 } },
    ],
    walls: [
        { start: { x: 3, y: 1 }, end: { x: 3, y: 2 } },
    ],
    escalators: [],
    barriers: [
        { coord: { x: 1, y: 1 } },
        { coord: { x: 0, y: 2 } },
        { coord: { x: 1, y: 2 } },
        { coord: { x: 2, y: 2 } },
    ]
}

const NINTH = {
    items: [{ type: ItemType.COIN, coord: { x: 3, y: 3 } }],
    connections: [
        DIRECTIONS.RIGHT,
    ],
    portals: [
        { coord: { x: 2, y: 1 } },],
    walls: [
        { start: { x: 1, y: 1 }, end: { x: 3, y: 1 } },
        { start: { x: 1, y: 2 }, end: { x: 3, y: 2 } },
        { start: { x: 1, y: 1 }, end: { x: 1, y: 2 } },
    ],
    escalators: [],
    barriers: [
        { coord: { x: 0, y: 3 } },
        { coord: { x: 1, y: 1 } },
        { coord: { x: 2, y: 2 } },
        { coord: { x: 2, y: 3 } },
    ]
}

const blockedConnectionWalls = new Map()

blockedConnectionWalls[DIRECTIONS.LEFT] =  { start: { x: 0, y: 1 }, end: { x: 0, y: 2 } }
blockedConnectionWalls[DIRECTIONS.RIGHT] =  { start: { x: 4, y: 2 }, end: { x: 4, y: 3 } }
blockedConnectionWalls[DIRECTIONS.UP] =  { start: { x: 2, y: 0 }, end: { x: 3, y: 0 } }
blockedConnectionWalls[DIRECTIONS.DOWN] =  { start: { x: 1, y: 4 }, end: { x: 2, y: 4 } }

const otherSections = [
    SECOND,
    THIRD,
    FOURTH,
    FIFTH,
    SIXTH,
    SEVENTH,
    EIGHTH,
    NINTH,
]

class GameSectionProvider {
    constructor() {
        this.sectionDimensions = 4
        this.sectionData = [FIRST].concat(this.shuffle(otherSections))
        this.remaining = this.sectionData.length
    }

    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            // And swap it with the current element.
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }

    createSection(id, offset, direction) {
        const sectionData = this.sectionData[id]

        const section = new Section(id, this.sectionDimensions, offset, direction)


        this.addWalls(section, sectionData.walls)
        this.addItems(section, sectionData.items)
        this.addPortals(section, sectionData.portals)
        this.addConnections(section, sectionData.connections)
        //this.addBlockedConnections(section, sectionData.connections)
        this.addEscalators(section, sectionData.escalators)
        this.addBarriers(section, sectionData.barriers)
        this.addExit(section, sectionData.exit)

        this.remaining -= 1

        return section
    }

    getTileCoord(direction, dataCoord) {
        return getRotatedCoord(direction, new Coordinate(dataCoord.x, dataCoord.y), this.sectionDimensions)
    }

    addExit(section, exit) {
        if(!exit) {
            return
        }
        section.addTile(new Tile(this.getTileCoord(section.direction, exit.coord), TileType.EXIT))
    }

    addWalls(section, walls) {
        walls.forEach( wall => this.addWall(section, wall))
    }

    addBarriers(section, barriers) {
        barriers.forEach( barrier => section.addWallTile(this.getTileCoord(section.direction, barrier.coord)))
    }

    addItems(section, items) {
        items.forEach( item => section.addTile(new Tile(this.getTileCoord(section.direction, item.coord), TileType.NORMAL, new Item(item.type))))
    }

    addPortal(section, portal) {
        section.addTile(new Tile(this.getTileCoord(section.direction, portal.coord), TileType.PORTAL))
    }

    addPortals(section, portals) {
        //adding just a single until portals are token selective
        const randomIndex = Math.floor(Math.random() * portals.length * 2)
        if(randomIndex < portals.length) {
            this.addPortal(section, portals[randomIndex])
        }
        //portals.forEach( portal => this.addPortal(section, portal))
    }

    createConnection(sectionDirection, direction ) {
        const beforeRotation = getConnectionCoordinate(direction, this.sectionDimensions)
        const coordAfterRotation = getRotatedCoord(sectionDirection, beforeRotation, this.sectionDimensions)
        const directionAfterRotation = getRotatedDirection(sectionDirection, direction)
        return new Connection(directionAfterRotation, coordAfterRotation, this.sectionDimensions)
    }

    addConnections(section, connections) {
        connections.forEach( connectionDirection => section.addConnection(this.createConnection(section.direction, connectionDirection)))
        if(!connections.includes(DIRECTIONS.UP )) {
            this.addWall(section, { start: { x: 0, y: 0 }, end: { x: 4, y: 0 } })
        } else {
            this.addWall(section, { start: { x: 0, y: 0 }, end: { x: 2, y: 0 } })
            this.addWall(section, { start: { x: 3, y: 0 }, end: { x: 4, y: 0 } })
        }

        //down always has opening
        this.addWall(section, { start: { x: 0, y: 4 }, end: { x: 1, y: 4 } })
        this.addWall(section, { start: { x: 2, y: 4 }, end: { x: 4, y: 4 } })

        if(!connections.includes(DIRECTIONS.LEFT )) {
            this.addWall(section, { start: { x: 0, y: 0 }, end: { x: 0, y: 4 } })
        } else {
            this.addWall(section, { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } })
            this.addWall(section, { start: { x: 0, y: 2 }, end: { x: 0, y: 4 } })
        }

        if(!connections.includes(DIRECTIONS.RIGHT )) {
            this.addWall(section, { start: { x: 4, y: 0 }, end: { x: 4, y: 4 } })
        } else {
            this.addWall(section, { start: { x: 4, y: 0 }, end: { x: 4, y: 2 } })
            this.addWall(section, { start: { x: 4, y: 3 }, end: { x: 4, y: 4 } })
        }

        //this.addWalls(section, standardWalls)
    }

    getWallCoord(direction, dataCoord) {
        return getRotatedWallCoord(direction, new Coordinate(dataCoord.x, dataCoord.y), this.sectionDimensions)
    }

    addWall(section, wall) {
        section.addWall(this.getWallCoord(section.direction, wall.start), this.getWallCoord(section.direction, wall.end))
    }

    /*addBlockedConnections(section, connections) {
        const directions = Array.from(blockedConnectionWalls.keys())
        directions.filter( direction => !connections.includes(direction))
            .forEach( direction => this.addWall(section, blockedConnectionWalls[direction]))
    }*/

    addEscalators(section, escalators) {
        escalators.forEach( escalator => section.addEscalator(new Escalator(this.getTileCoord(section.direction, escalator.start), this.getTileCoord(section.direction, escalator.end))))
    }

    getInitialTokenCoordinates() {
        //return []
        return [new Coordinate(1, 1), new Coordinate(2, 2)]
    }


}

module.exports = {
    GameSectionProvider
}
