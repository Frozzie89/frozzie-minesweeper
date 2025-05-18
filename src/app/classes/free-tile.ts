import { Tile } from "./tile";

export class FreeTile extends Tile {

    public override doAction(): void {
        console.log("It's a free-tile. Show how many bomb-tiles are surrounding this tile");
    }

}
