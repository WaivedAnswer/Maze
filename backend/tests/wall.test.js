const Wall = require('../models/wall').Wall
const Coordinate = require('../models/coordinate').Coordinate

test('adjacent coords either side of single cell vertical wall, between', () => {
    const wall = new Wall(new Coordinate(1,0), new Coordinate(1,1))
    const firstCoord = new Coordinate(1,0)
    const secondCoord = new Coordinate(0,0)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(true)
})

test('adjacent coords below single cell vertical wall, not between', () => {
    const wall = new Wall(new Coordinate(1,0), new Coordinate(1,1))
    const firstCoord = new Coordinate(1,1)
    const secondCoord = new Coordinate(0,1)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(false)
})

test('adjacent coords above single cell vertical wall, not between', () => {
    const wall = new Wall(new Coordinate(1,1), new Coordinate(1,2))
    const firstCoord = new Coordinate(0,0)
    const secondCoord = new Coordinate(1,0)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(false)
})

test('adjacent coords left of single cell vertical wall, not between ', () => {
    const wall = new Wall(new Coordinate(2,0), new Coordinate(2,1))
    const firstCoord = new Coordinate(0,0)
    const secondCoord = new Coordinate(1,0)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(false)
})

test('adjacent coords either side of single cell horizontal wall, between ', () => {
    const wall = new Wall(new Coordinate(0,1), new Coordinate(1,1))
    const firstCoord = new Coordinate(0,0)
    const secondCoord = new Coordinate(0,1)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(true)
})

test('adjacent coords right of single cell horizontal wall, not between ', () => {
    const wall = new Wall(new Coordinate(0,1), new Coordinate(1,1))
    const firstCoord = new Coordinate(1,0)
    const secondCoord = new Coordinate(1,1)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(false)
})

test('adjacent coords left of single cell horizontal wall, not between ', () => {
    const wall = new Wall(new Coordinate(1,1), new Coordinate(2,1))
    const firstCoord = new Coordinate(0,0)
    const secondCoord = new Coordinate(0,1)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(false)
})

test('adjacent coords below single cell horizontal wall, not between ', () => {
    const wall = new Wall(new Coordinate(0,1), new Coordinate(1,1))
    const firstCoord = new Coordinate(0,1)
    const secondCoord = new Coordinate(1,1)

    expect(wall.isBetween(firstCoord, secondCoord)).toBe(false)
})