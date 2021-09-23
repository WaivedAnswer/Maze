const Section = require('../models/section').Section
const Coordinate = require('../models/coordinate').Coordinate

test('section relativeTo origin', () => {
    const origin = new Coordinate(0, 0)
    const section = new Section(4, origin)
    const testCoordinate = new Coordinate(5,5)

    const result = section.getRelativeCoord(testCoordinate)

    expect(result).toStrictEqual(testCoordinate)
})

test('section relativeTo positive', () => {
    const offset = new Coordinate(3, 2)
    const section = new Section(4, offset)
    const testCoordinate = new Coordinate(5, 5)

    const result = section.getRelativeCoord(testCoordinate)

    expect(result).toStrictEqual(new Coordinate(2, 3))
})

test('section relativeTo negative', () => {
    const offset = new Coordinate(-3, -4)
    const section = new Section(4, offset)
    const testCoordinate = new Coordinate(5, 5)

    const result = section.getRelativeCoord(testCoordinate)

    expect(result).toStrictEqual(new Coordinate(8, 9))
})

test('section no walls', () => {
    const offset = new Coordinate(0, 0)
    const section = new Section(4, offset)

    const result = section.getWalls()

    expect(result).toStrictEqual([])
})

test('section single wall', () => {
    const offset = new Coordinate(0, 0)
    const section = new Section(4, offset)
    section.addWall(new Coordinate(0, 0))

    const result = section.getWalls(new Coordinate(0,0))

    expect(result).toEqual(expect.arrayContaining([{ x:0, y:0 }]))
})

test('section multi wall', () => {
    const offset = new Coordinate(0, 0)
    const section = new Section(4, offset)
    section.addWall(new Coordinate(0,0))
    section.addWall(new Coordinate(1,1))
    section.addWall(new Coordinate(2,2))

    const result = section.getWalls(new Coordinate(0,0))

    expect(result).toEqual(expect.arrayContaining([{ x:0, y:0 }, { x:1, y:1 }, { x:2, y:2 }]))
})