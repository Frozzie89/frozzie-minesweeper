import { BombTile } from "./bomb-tile";
import { FreeTile } from "./free-tile";
import { Tile } from "./tile";

export class TileMatrix {

    matrix: Tile[][]

    constructor(xSize: number, ySize: number) {
        this.matrix = []

        for (var i: number = 0; i < xSize; i++) {
            this.matrix[i] = []
            for (var j: number = 0; j < ySize; j++) {

                let tile: Tile
                if (Math.floor(Math.random() * 2) == 0) {
                    tile = new FreeTile(i, j)
                } else {
                    tile = new BombTile(i, j)
                }

                this.matrix[i][j] = tile;
            }
        }

    }

}