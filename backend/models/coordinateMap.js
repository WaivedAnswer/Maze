class CoordinateMap {
    constructor() {
        this.map = new Map()
    }

    addItem(coord, item) {
        this.map.set(coord.getKey(), item)
    }

    hasItemAt(coord) {
        const key = coord.getKey()
        return  this.map.has(key)
    }

    getItemAt(coord) {
        const key = coord.getKey()
        return this.map.get(key)
    }

    getItems() {
        return [...this.map.values()]
    }

    getCoordKeys() {
        return this.map.keys()
    }
}

module.exports = {
    CoordinateMap
}
