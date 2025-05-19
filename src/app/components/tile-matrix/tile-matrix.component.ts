import { Component, OnInit } from '@angular/core';
import { TileMatrix } from '../../classes/tile-matrix';
import { NgFor, NgStyle } from '@angular/common';
import { TileComponent } from "../tile/tile.component";

@Component({
    selector: 'app-tile-matrix',
    standalone: true,
    imports: [NgFor, TileComponent, NgStyle],
    templateUrl: './tile-matrix.component.html',
    styleUrl: './tile-matrix.component.scss'
})
export class TileMatrixComponent implements OnInit {

    tileMatrix!: TileMatrix

    ngOnInit(): void {
        this.tileMatrix = new TileMatrix()
        this.tileMatrix.init(9, 9)
        this.tileMatrix.loadBombs(20)
        console.log(this.tileMatrix);

    }

    get rowCount(): number {
        return this.tileMatrix?.matrix?.length || 0;
    }

}
