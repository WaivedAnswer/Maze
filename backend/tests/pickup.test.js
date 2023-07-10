const Pickup = require('../models/pickup').Pickup
const { Tile, TileType } = require('../models/tile')
const { Token, TokenType }= require('../models/token')
const { Item, ItemType }= require('../models/item')
const Coordinate = require('../models/coordinate').Coordinate
const onBoardChange = () => {
}
const onFlipTimer = () => {
}
const subject = new Pickup(onBoardChange, onFlipTimer)

test('item pickup', () => {
    //is it necessary for the tile and the token to have their coordinates?
    //if not then who has them?
    const item = new Item()
    const tile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, item)
    const token = new Token(new Coordinate(0,0))


    subject.interact(token, tile)

    expect(tile.item).toBeNull()
    expect(token.items).toEqual([item])
})

test('item pickup no tile item, token already has item', () => {
    const item = new Item()
    const tile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, null)
    const token = new Token(new Coordinate(0,0))
    token.pickupItem(item)

    subject.interact(token, tile)

    expect(tile.item).toBeNull()
    expect(token.items).toEqual([item])
})

test('second item pickup, token already has item', () => {
    const item = new Item()
    const secondItem = new Item()
    const tile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, secondItem)
    const token = new Token(new Coordinate(0,0))
    token.pickupItem(item)

    subject.interact(token, tile)

    expect(tile.item).toBeNull()
    expect(token.items).toEqual(expect.arrayContaining([item, secondItem]))
})

test('pickup all weapons single matching', () => {
    const barbarianWeapon = new Item(ItemType.WEAPON, TokenType.BARBARIAN)

    const barbarianTile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, barbarianWeapon)
    const barbarianToken = new Token(new Coordinate(0,0), TokenType.BARBARIAN)

    subject.pickupAllWeapons([barbarianToken], [barbarianTile])

    expect(barbarianTile.item).toBeNull()
    expect(barbarianToken.items).toEqual(expect.arrayContaining([barbarianWeapon]))
})


test('pickup all weapons multiple matching', () => {
    const barbarianWeapon = new Item(ItemType.WEAPON, TokenType.BARBARIAN)
    const dwarfWeapon = new Item(ItemType.WEAPON, TokenType.DWARF)

    const barbarianTile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, barbarianWeapon)
    const barbarianToken = new Token(new Coordinate(0,0), TokenType.BARBARIAN)

    const dwarfTile = new Tile(new Coordinate(1,0), TileType.NORMAL, null, dwarfWeapon)
    const dwarfToken = new Token(new Coordinate(1,0), TokenType.DWARF)

    subject.pickupAllWeapons([barbarianToken, dwarfToken], [barbarianTile, dwarfTile])

    expect(barbarianTile.item).toBeNull()
    expect(barbarianToken.items).toEqual(expect.arrayContaining([barbarianWeapon]))

    expect(dwarfTile.item).toBeNull()
    expect(dwarfToken.items).toEqual(expect.arrayContaining([dwarfWeapon]))
})

test('pickup all weapons multiple one matching', () => {
    const barbarianWeapon = new Item(ItemType.WEAPON, TokenType.BARBARIAN)
    const elfWeapon = new Item(ItemType.WEAPON, TokenType.ELF)

    const barbarianTile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, barbarianWeapon)
    const barbarianToken = new Token(new Coordinate(0,0), TokenType.BARBARIAN)

    const dwarfTile = new Tile(new Coordinate(1,0), TileType.NORMAL, null, elfWeapon)
    const dwarfToken = new Token(new Coordinate(1,0), TokenType.DWARF)

    subject.pickupAllWeapons([barbarianToken, dwarfToken], [barbarianTile, dwarfTile])

    expect(barbarianTile.item).toEqual(barbarianWeapon)
    expect(barbarianToken.items).toEqual(expect.arrayContaining([]))

    expect(dwarfTile.item).toEqual((elfWeapon))
    expect(dwarfToken.items).toEqual(expect.arrayContaining([]))
})

test('pickup all weapons swapped', () => {
    const barbarianWeapon = new Item(ItemType.WEAPON, TokenType.BARBARIAN)
    const dwarfWeapon = new Item(ItemType.WEAPON, TokenType.DWARF)

    const barbarianTile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, barbarianWeapon)
    const barbarianToken = new Token(new Coordinate(0,0), TokenType.BARBARIAN)

    const dwarfTile = new Tile(new Coordinate(1,0), TileType.NORMAL, null, dwarfWeapon)
    const dwarfToken = new Token(new Coordinate(1,0), TokenType.DWARF)

    subject.pickupAllWeapons([dwarfToken, barbarianToken], [barbarianTile, dwarfTile])

    expect(barbarianTile.item).toEqual(barbarianWeapon)
    expect(barbarianToken.items).toEqual(expect.arrayContaining([]))

    expect(dwarfTile.item).toEqual((dwarfWeapon))
    expect(dwarfToken.items).toEqual(expect.arrayContaining([]))
})

test('weapon interact', () => {
    const barbarianWeapon = new Item(ItemType.WEAPON, TokenType.BARBARIAN)
    const dwarfWeapon = new Item(ItemType.WEAPON, TokenType.DWARF)

    const barbarianTile = new Tile(new Coordinate(0,0), TileType.NORMAL, null, barbarianWeapon)
    const barbarianToken = new Token(new Coordinate(0,0), TokenType.BARBARIAN)

    const dwarfTile = new Tile(new Coordinate(1,0), TileType.NORMAL, null, dwarfWeapon)
    const dwarfToken = new Token(new Coordinate(1,0), TokenType.DWARF)

    subject.pickupAllWeapons([dwarfToken, barbarianToken], [barbarianTile, dwarfTile])

    expect(barbarianTile.item).toEqual(barbarianWeapon)
    expect(barbarianToken.items).toEqual(expect.arrayContaining([]))

    expect(dwarfTile.item).toEqual((dwarfWeapon))
    expect(dwarfToken.items).toEqual(expect.arrayContaining([]))
})