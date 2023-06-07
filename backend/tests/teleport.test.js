const PortalManager = require('../models/portalManager').PortalManager
const Coordinate = require('../models/coordinate').Coordinate
const Token = require('../models/token').Token

test('teleport no portals', () => {
    const subject = new PortalManager()
    const token = new Token(new Coordinate(0,0))

    const resultCoord = subject.teleport(token, new Coordinate(4,5))

    expect(resultCoord).toEqual(token.coordinate)
})

test('teleport token not on portal', () => {
    const token = new Token(new Coordinate(0,0))
    const firstPortal = new Coordinate(4,5)
    const secondPortal = new Coordinate(9,9)
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, new Coordinate(9,9))

    expect(resultCoord).toEqual(token.coordinate)
})

test('teleport portal to portal', () => {
    const token = new Token(new Coordinate(0,0))
    const firstPortal = token.coordinate
    const secondPortal = new Coordinate(9,9)
    const subject = new PortalManager()

    subject.trackPortal(firstPortal)
    subject.trackPortal(secondPortal)

    const resultCoord = subject.teleport(token, secondPortal)

    expect(resultCoord).toEqual(secondPortal)
})

test('teleport token on portal, no target', () => {
    const token = new Token(new Coordinate(0,0))
    const subject = new PortalManager()
    subject.trackPortal(new Coordinate(0,0))

    const resultCoord = subject.teleport(token, new Coordinate(4,5))

    expect(resultCoord).toEqual(token.coordinate)
})

