export class Tile {
    xPos: number
    yPos: number
    isBomb: boolean
    isRevealed: boolean = false
    adjacentBombs: number = 0

    constructor(xPos: number, yPos: number, isBomb: boolean) {
        this.xPos = xPos
        this.yPos = yPos
        this.isBomb = isBomb
    }

    public onClick(): void {
        this.isRevealed = true
    }
}
