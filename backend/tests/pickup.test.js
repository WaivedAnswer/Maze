const Pickup = require('../models/pickup').Pickup
const { Tile, TileType } = require('../models/tile')
const Token = require('../models/token').Token
const Item = require('../models/item').Item
const Coordinate = require('../models/coordinate').Coordinate

test('item pickup', () => {
    //is it necessary for the tile and the token to have their coordinates?
    //if not then who has them?
    const item = new Item()
    const tile = new Tile(new Coordinate(0,0), TileType.NORMAL, item)
    const token = new Token(new Coordinate(0,0))
    const subject = new Pickup()

    subject.interact(token, tile)

    expect(tile.item).toBeNull()
    expect(token.items).toEqual([item])
})

test('item pickup no tile item, token already has item', () => {
    const item = new Item()
    const tile = new Tile(new Coordinate(0,0), TileType.NORMAL, null)
    const token = new Token(new Coordinate(0,0))
    token.pickupItem(item)

    const subject = new Pickup()
    subject.interact(token, tile)

    expect(tile.item).toBeNull()
    expect(token.items).toEqual([item])
})

test('second item pickup, token already has item', () => {
    const item = new Item()
    const secondItem = new Item()
    const tile = new Tile(new Coordinate(0,0), TileType.NORMAL, secondItem)
    const token = new Token(new Coordinate(0,0))
    token.pickupItem(item)

    const subject = new Pickup()
    subject.interact(token, tile)

    expect(tile.item).toBeNull()
    expect(token.items).toEqual(expect.arrayContaining([item, secondItem]))
})