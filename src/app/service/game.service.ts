import { Injectable } from '@angular/core';
import { TileMatrix } from '../classes/tile-matrix';
import { Tile } from '../classes/tile';
import { GameState } from '../classes/game-state';
import { Mode } from '../classes/mode';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    tileMatrix!: TileMatrix
    gameState: GameState = GameState.INIT
    totalBombs: number = 20
    flaggedTiles: number = 0
    mode: Mode = Mode.REVEALING

    constructor() {
        this.tileMatrix = new TileMatrix()
        this.tileMatrix.init(9, 9)
    }

    loadBombs(tile: Tile): void {
        const safeZone = this.tileMatrix.loadBombs(this.totalBombs, tile);
        this.gameState = GameState.IN_GAME;

        for (const [x, y] of safeZone) {
            this.revealTile(this.tileMatrix.matrix[x][y]);
        }
    }

    revealTile(tile: Tile): void {
        if (tile.isRevealed || tile.isBomb || tile.isFlagged) return;

        tile.isRevealed = true;
        tile.adjacentBombs = this.getAdjacentBombsCount(tile);

        if (tile.adjacentBombs > 0) return;

        const directions = [
            [-1, 0], [-1, -1], [0, -1], [1, -1],
            [1, 0], [1, 1], [0, 1], [-1, 1],
        ];

        for (const [dx, dy] of directions) {
            const x = tile.xPos + dx;
            const y = tile.yPos + dy;

            if (
                x >= 0 && x < this.tileMatrix.matrix.length &&
                y >= 0 && y < this.tileMatrix.matrix[0].length
            ) {
                const neighbor = this.tileMatrix.matrix[x][y];
                this.revealTile(neighbor);
            }
        }
    }

    getAdjacentBombsCount(tile: Tile): number {
        let count = 0
        const directions = [
            [-1, 0], // top
            [-1, -1], // top-left
            [0, -1], // left
            [1, -1], // bottom-left
            [1, 0], // bottom
            [1, 1], // bottom-right
            [0, 1], // right
            [-1, 1], // top-right
        ]

        for (const [dx, dy] of directions) {
            const x = tile.xPos + dx
            const y = tile.yPos + dy

            if (
                x >= 0 && x < this.tileMatrix.matrix.length &&
                y >= 0 && y < this.tileMatrix.matrix[0].length
            ) {
                if (this.tileMatrix.matrix[x][y].isBomb) {
                    count++
                }
            }
        }

        return count
    }
}
