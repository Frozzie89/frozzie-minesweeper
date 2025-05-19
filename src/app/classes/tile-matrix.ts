import { BombTile } from "./bomb-tile";
import { FreeTile } from "./free-tile";
import { Tile } from "./tile";

export class TileMatrix {

    matrix: Tile[][]
    allPositions: [number, number][] = []

    constructor() {
        this.matrix = []
    }

    init(xSize: number, ySize: number): void {
        for (var i: number = 0; i < xSize; i++) {
            this.matrix[i] = []
            for (var j: number = 0; j < ySize; j++) {
                this.matrix[i][j] = new FreeTile(i, j);
            }
        }

        for (let r = 0; r < xSize; r++) {
            for (let c = 0; c < ySize; c++) {
                this.allPositions.push([r, c]);
            }
        }
    }

    loadBombs(bombCount: number) {
        const bombPositions = this.shuffle(this.allPositions).slice(0, bombCount);

        for (const [r, c] of bombPositions) {
            this.matrix[r][c] = new BombTile(r, c)
        }
    }

    private shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}