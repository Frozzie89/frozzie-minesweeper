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

        for (const neighbor of this.getAdjacentTiles(tile)) {
            this.revealTile(neighbor);
        }
    }

    getAdjacentBombsCount(tile: Tile): number {
        return this.getAdjacentTiles(tile).filter(t => t.isBomb).length;
    }

    private getAdjacentTiles(tile: Tile): Tile[] {
        const tiles: Tile[] = [];
        const ADJACENT_DIRECTIONS: [number, number][] = [
            [-1, 0], [-1, -1], [0, -1], [1, -1],
            [1, 0], [1, 1], [0, 1], [-1, 1],
        ];

        for (const [dx, dy] of ADJACENT_DIRECTIONS) {
            const x = tile.xPos + dx;
            const y = tile.yPos + dy;

            if (
                x >= 0 && x < this.tileMatrix.matrix.length &&
                y >= 0 && y < this.tileMatrix.matrix[0].length
            ) {
                tiles.push(this.tileMatrix.matrix[x][y]);
            }
        }

        return tiles;
    }
}
