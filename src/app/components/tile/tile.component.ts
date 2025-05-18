import { Component, OnInit } from '@angular/core';
import { Tile } from '../../classes/tile';
import { FreeTile } from '../../classes/free-tile';
import { BombTile } from '../../classes/bomb-tile';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-tile',
    standalone: true,
    imports: [MatCardModule, NgClass, NgIf, FontAwesomeModule],
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss'
})
export class TileComponent implements OnInit {

    tile!: Tile
    faBomb = faBomb

    ngOnInit(): void {
        if (Math.floor(Math.random() * 2) == 0) {
            this.tile = new FreeTile(0, 0)
        } else {
            this.tile = new BombTile(0, 0)
        }
    }

    isBomb(): boolean {
        return this.tile instanceof BombTile
    }

    clickTile(): void {
        this.tile.onClick()
    }

}
