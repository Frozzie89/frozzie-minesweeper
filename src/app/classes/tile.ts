export abstract class Tile {
    xPos: number
    yPos: number
    isRevealed: boolean = false

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos
        this.yPos = yPos
    }

    public onClick(): void {
        if (!this.isRevealed) {
            this.doAction()
        }

        this.isRevealed = true
    }

    public abstract doAction(): void
}
