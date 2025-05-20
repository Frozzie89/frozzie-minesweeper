import { Injectable } from '@angular/core';
import { TileMatrix } from '../classes/tile-matrix';
import { Tile } from '../classes/tile';
import { GameState } from '../classes/game-state';
import { Mode } from '../classes/mode';
import { BehaviorSubject } from 'rxjs';
import { Difficulty, GAME_CONFIGS } from '../classes/game-configs';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    tileMatrix: TileMatrix = new TileMatrix()
    difficulty = GAME_CONFIGS[Difficulty.MEDIUM]
    flaggedTiles: number = 0
    mode: Mode = Mode.REVEALING
    hasWon: boolean = false;

    gameStateSubject = new BehaviorSubject<GameState>(GameState.INIT)
    gameState$ = this.gameStateSubject.asObservable();

    constructor() {
        this.initGame()
    }

    getGameState(): GameState {
        return this.gameStateSubject.value;
    }

    setGameState(gameState: GameState) {
        this.gameStateSubject.next(gameState)
    }

    initGame() {
        this.setGameState(GameState.INIT)
        this.flaggedTiles = 0
        this.hasWon = false
        this.tileMatrix.init(this.difficulty.xSize, this.difficulty.ySize)
    }

    loadBombs(tile: Tile): void {
        const safeZone = this.tileMatrix.loadBombs(this.difficulty.total_bombs, tile);
        this.setGameState(GameState.IN_GAME);

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

    revealAllBombsStaggered(delay: number = 50) {
        const bombTiles: Tile[] = [];

        for (const row of this.tileMatrix.matrix) {
            for (const tile of row) {
                if (tile.isBomb && !tile.isRevealed && !tile.isFlagged) {
                    bombTiles.push(tile);
                }
            }
        }

        bombTiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.isRevealedGameOver = true
                tile.isRevealed = true
            }, delay * index);
        });
    }


    getAdjacentBombsCount(tile: Tile): number {
        return this.getAdjacentTiles(tile).filter(t => t.isBomb).length;
    }

    checkWinCondition(): boolean {
        for (const row of this.tileMatrix.matrix) {
            for (const tile of row) {
                // If a bomb is not flagged → can't win
                if (tile.isBomb && !tile.isFlagged) {
                    return false;
                }

                // If a non-bomb tile is flagged → can't win
                if (!tile.isBomb && tile.isFlagged) {
                    return false;
                }
            }
        }

        return true;
    }

    handleWinning() {
        if (!this.hasWon) {
            this.hasWon = true
            this.setGameState(GameState.GAME_OVER)
        }
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
