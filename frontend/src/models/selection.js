class Selection {
    constructor(selectorName, isSelf) {
        this.selectorName = selectorName
        this.isSelf = isSelf
    }

     getInitials() {
        const split = this.selectorName.split(" ")
        return split.map(substr => substr[0]).join('')
      }
}

export { Selection }