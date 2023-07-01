const { getRotatedCoord, getRotatedWallCoord } = require('../models/rotations')
const { Coordinate } = require('../models/coordinate')
const { DIRECTIONS } = require('../models/direction')


test('up to up', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedCoord(DIRECTIONS.UP, originalCoord, 4)

    expect(result).toEqual(originalCoord)
})

test('up to down origin', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedCoord(DIRECTIONS.DOWN, originalCoord, 4)

    expect(result).toEqual(new Coordinate(3, 3))
})

test('up to down middle', () => {
    const originalCoord = new Coordinate(1, 1)

    const result = getRotatedCoord(DIRECTIONS.DOWN, originalCoord, 4)

    expect(result).toEqual(new Coordinate(2, 2))
})

test('up to down edge', () => {
    const originalCoord = new Coordinate(0, 2)

    const result = getRotatedCoord(DIRECTIONS.DOWN, originalCoord, 4)

    expect(result).toEqual(new Coordinate(3, 1))
})

test('up to left origin', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedCoord(DIRECTIONS.LEFT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(0, 3))
})

test('up to left middle', () => {
    const originalCoord = new Coordinate(1, 1)

    const result = getRotatedCoord(DIRECTIONS.LEFT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(1, 2))
})

test('up to left edge', () => {
    const originalCoord = new Coordinate(0, 2)

    const result = getRotatedCoord(DIRECTIONS.LEFT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(2, 3))
})

test('up to right origin', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedCoord(DIRECTIONS.RIGHT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(3, 0))
})

test('up to right middle', () => {
    const originalCoord = new Coordinate(1, 1)

    const result = getRotatedCoord(DIRECTIONS.RIGHT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(2, 1))
})

test('up to right edge', () => {
    const originalCoord = new Coordinate(0, 2)

    const result = getRotatedCoord(DIRECTIONS.RIGHT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(1, 0))
})

test('up to down origin', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedWallCoord(DIRECTIONS.DOWN, originalCoord, 4)

    expect(result).toEqual(new Coordinate(4, 4))
})

test('up to left origin', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedWallCoord(DIRECTIONS.LEFT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(0, 4))
})

test('up to right origin', () => {
    const originalCoord = new Coordinate(0, 0)

    const result = getRotatedWallCoord(DIRECTIONS.RIGHT, originalCoord, 4)

    expect(result).toEqual(new Coordinate(4, 0))
})