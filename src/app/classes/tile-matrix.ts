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
                this.matrix[i][j] = new Tile(i, j, false);
            }
        }

        for (let r = 0; r < xSize; r++) {
            for (let c = 0; c < ySize; c++) {
                this.allPositions.push([r, c]);
            }
        }
    }

    loadBombs(bombCount: number, tileToIgnore: Tile): [number, number][] {
        const safeZone = this.getSafeZone(tileToIgnore);
        const availablePositions = this.allPositions.filter(
            ([x, y]) => !safeZone.some(pos => pos[0] === x && pos[1] === y)
        );

        const bombPositions = this.shuffle(availablePositions).slice(0, bombCount);

        for (const [r, c] of bombPositions) {
            this.matrix[r][c] = new Tile(r, c, true);
        }

        return safeZone; // return safeZone for external handling
    }

    private getSafeZone(tile: Tile): [number, number][] {
        const zone: [number, number][] = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = tile.xPos + dx;
                const ny = tile.yPos + dy;

                if (this.isInBounds(nx, ny)) {
                    zone.push([nx, ny]);
                }
            }
        }

        return zone;
    }

    private isInBounds(x: number, y: number): boolean {
        return x >= 0 && y >= 0 && x < this.matrix.length && y < this.matrix[0].length;
    }

    private shuffle<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

}