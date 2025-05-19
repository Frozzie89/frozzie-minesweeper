import { Component, Input, OnInit } from '@angular/core';
import { Tile } from '../../classes/tile';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../../service/game.service';
import { TileNumberDisplayPipe } from "../../pipes/tile-number-display.pipe";

@Component({
    selector: 'app-tile',
    standalone: true,
    imports: [MatCardModule, NgClass, NgIf, FontAwesomeModule, TileNumberDisplayPipe],
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss'
})
export class TileComponent {

    @Input() tile!: Tile
    surroundingBombsNumber: number = 0;
    faBomb = faBomb

    constructor(private gameService: GameService) { }

    clickTile(): void {
        this.tile.onClick()
        if (!this.tile.isBomb) {
            this.surroundingBombsNumber = this.gameService.getSurroundingBombsNumber(this.tile);
        }
    }

}
