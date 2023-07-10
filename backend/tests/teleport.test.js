const PortalManager = require('../models/portalManager').PortalManager
const Coordinate = require('../models/coordinate').Coordinate
const { Token, TokenType } = require('../models/token')
const Portal = require('../models/portal').Portal

test('teleport no portals', () => {
    const subject = new PortalManager()
    const token = new Token(new Coordinate(0,0), TokenType.ELF)

    const resultCoord = subject.teleport(token, new Coordinate(4,5))

    expect(resultCoord).toEqual(token.coordinate)
})

test('teleport token not on portal', () => {
    const token = new Token(new Coordinate(0,0), TokenType.ELF)
    const firstPortal = getPortal(new Coordinate(4,5))
    const secondPortal = getPortal(new Coordinate(9,9))
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, new Coordinate(9,9))

    expect(resultCoord).toEqual(token.coordinate)
})

const getPortal = ( coord ) => {
    return new Portal(coord, TokenType.ELF)
}

test('teleport portal to portal', () => {
    const token = new Token(new Coordinate(0,0), TokenType.ELF)
    const firstPortal = getPortal(token.coordinate)
    const secondPortal = getPortal(new Coordinate(9,9))
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, secondPortal.coord)

    expect(resultCoord).toEqual(secondPortal.coord)
})

test('teleport token on portal, no target', () => {
    const token = new Token(new Coordinate(0,0), TokenType.ELF)
    const subject = new PortalManager()
    subject.trackPortal(getPortal(new Coordinate(0,0)))

    const resultCoord = subject.teleport(token, new Coordinate(4,5))

    expect(resultCoord).toEqual(token.coordinate)
})

test('teleport portal to portal, wrong token', () => {
    const token = new Token(new Coordinate(0,0), TokenType.ELF)
    const firstPortal = new Portal(token.coordinate, TokenType.DWARF)
    const secondPortal = new Portal(new Coordinate(9,9), TokenType.DWARF)
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, secondPortal.coord)

    expect(resultCoord).toEqual(token.coordinate)
})

test('teleport portal to portal, mismatched portals', () => {
    const token = new Token(new Coordinate(0,0), TokenType.ELF)
    const firstPortal = new Portal(token.coordinate, TokenType.ELF)
    const secondPortal = new Portal(new Coordinate(9,9), TokenType.DWARF)
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, secondPortal.coord)

    expect(resultCoord).toEqual(token.coordinate)
})

test('teleport portal to portal, mismatched portals 2', () => {
    const token = new Token(new Coordinate(0,0), TokenType.ELF)
    const firstPortal = new Portal(token.coordinate, TokenType.DWARF)
    const secondPortal = new Portal(new Coordinate(9,9), TokenType.ELF)
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, secondPortal.coord)

    expect(resultCoord).toEqual(token.coordinate)
})
