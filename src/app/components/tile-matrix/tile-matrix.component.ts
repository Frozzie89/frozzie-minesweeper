import { Component, OnInit } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { TileComponent } from "../tile/tile.component";
import { GameService } from '../../service/game.service';

@Component({
    selector: 'app-tile-matrix',
    standalone: true,
    imports: [NgFor, TileComponent, NgStyle],
    templateUrl: './tile-matrix.component.html',
    styleUrl: './tile-matrix.component.scss'
})
export class TileMatrixComponent {

    constructor(private gameService: GameService) {
    }

    get tileMatrix() {
        return this.gameService.tileMatrix
    }


    get rowCount(): number {
        return this.gameService.tileMatrix?.matrix?.length || 0
    }

}
