import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../../classes/tile';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../../service/game.service';
import { TileNumberDisplayPipe } from "../../pipes/tile-number-display.pipe";
import { GameState } from '../../classes/game-state';

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

    leftClickTile(): void {
        if (this.tile.isFlagged) {
            return
        }

        if (this.gameService.gameState === GameState.INIT) {
            this.gameService.loadBombs(this.tile)
        } else if (!this.tile.isRevealed && !this.tile.isBomb) {
            this.gameService.revealTile(this.tile)
        } else {
            this.tile.isRevealed = true
        }
    }

    rightClickTile(): void {
        if (!this.tile.isRevealed) {
            this.tile.isFlagged = !this.tile.isFlagged
        }
    }

    getTileCssClasses(): { [key: string]: boolean } {
        return {
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
