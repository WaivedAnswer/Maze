const Section = require('../models/section').Section
const Coordinate = require('../models/coordinate').Coordinate

test('section  y', () => {
    const section = new Section(4, new Coordinate(0, 0), null)
    const result = section.canMove(new Coordinate(0, 0))
    expect(result).toBe(true)
})