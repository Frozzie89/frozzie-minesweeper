import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../../classes/tile';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../../service/game.service';
import { TileNumberDisplayPipe } from "../../pipes/tile-number-display.pipe";
import { GameState } from '../../classes/game-state';
import { Mode } from '../../classes/mode';

@Component({
    selector: 'app-tile',
    standalone: true,
    imports: [MatCardModule, NgClass, NgIf, FontAwesomeModule, TileNumberDisplayPipe],
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss'
})
export class TileComponent {

    @Input() tile!: Tile

    faBomb = faBomb
    faFlag = faFlag

    constructor(private gameService: GameService) { }

    onRevealingMode() {
        if (this.tile.isFlagged || this.gameService.getGameState() === GameState.GAME_OVER) {
            return
        }

        if (this.gameService.getGameState() === GameState.INIT) {
            this.gameService.loadBombs(this.tile)
        } else if (!this.tile.isRevealed && !this.tile.isBomb) {
            this.gameService.revealTile(this.tile)
        } else if (this.tile.isBomb) {
            // debugger
            this.tile.isClickedBomb = true
            this.tile.isRevealed = true
            this.gameService.revealAllBombsStaggered()
            this.gameService.setGameState(GameState.GAME_OVER)
        }

    }

    onFlaggingMode() {
        if (!this.tile.isRevealed && this.gameService.getGameState() === GameState.IN_GAME) {
            this.gameService.flaggedTiles += this.tile.isFlagged ? -1 : 1
            this.tile.isFlagged = !this.tile.isFlagged

            if (this.gameService.checkWinCondition()) {
                this.gameService.handleWinning()
            }
        }
    }

    leftClickTile(): void {
        if (this.gameService.mode === Mode.REVEALING) {
            this.onRevealingMode()
        } else {
            this.onFlaggingMode()
        }
    }

    rightClickTile(): void {
        this.onFlaggingMode()
    }

    getTileCssClasses(): { [key: string]: boolean } {
        return {
            'bomb-revealed-gameover': this.tile.isRevealedGameOver,
            'clicked-bomb': this.tile.isClickedBomb,
            'tile-revealed': this.tile.isRevealed,
            'tile-unrevealed': !this.tile.isRevealed,
            'tile-flagged': this.tile.isFlagged,
        };
    }

    getTileContent(): 'bomb' | 'flag' | 'number' | null {
        if (this.tile.isFlagged) return 'flag';
        if (this.tile.isRevealed && this.tile.isBomb) return 'bomb';
        if (this.tile.isRevealed && !this.tile.isBomb) return 'number';
        return null;
    }


}
