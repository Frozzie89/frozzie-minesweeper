import { Tile } from "./tile";

export class BombTile extends Tile {

    public override doAction(): void {
        console.log("it's a bomb-tile ! Game over");
    }
}
