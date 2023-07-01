const Section = require('../models/section').Section
const Coordinate = require('../models/coordinate').Coordinate
const { DIRECTIONS } = require('../models/direction')

const ID = 1
test('section relativeTo origin', () => {
    const origin = new Coordinate(0, 0)
    const section = new Section(ID, 4, origin, DIRECTIONS.UP)
    const testCoordinate = new Coordinate(5,5)

    const result = section.getRelativeCoord(testCoordinate)

    expect(result).toStrictEqual(testCoordinate)
})

test('section relativeTo positive', () => {
    const offset = new Coordinate(3, 2)
    const section = new Section(ID, 4, offset, DIRECTIONS.UP)
    const testCoordinate = new Coordinate(5, 5)

    const result = section.getRelativeCoord(testCoordinate)

    expect(result).toStrictEqual(new Coordinate(2, 3))
})

test('section relativeTo negative', () => {
    const offset = new Coordinate(-3, -4)
    const section = new Section(ID, 4, offset, DIRECTIONS.UP)
    const testCoordinate = new Coordinate(5, 5)

    const result = section.getRelativeCoord(testCoordinate)

    expect(result).toStrictEqual(new Coordinate(8, 9))
})