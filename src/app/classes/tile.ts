export class Tile {
    xPos: number
    yPos: number
    isBomb: boolean
    isFlagged: boolean = false
    isRevealed: boolean = false
    isRevealedGameOver: boolean = false
    isClickedBomb: boolean = false
    adjacentBombs: number = 0

    constructor(xPos: number, yPos: number, isBomb: boolean) {
        this.xPos = xPos
        this.yPos = yPos
        this.isBomb = isBomb
    }
}
