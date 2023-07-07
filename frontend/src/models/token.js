class Token {
    constructor(id, coord, selectedBy, escaped) {
        this.id = id
        this.coord = coord
        this.selectedBy = selectedBy
        this.escaped = escaped
    }
}

export default Token