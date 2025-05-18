import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileComponent } from "./components/tile/tile.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TileComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'frozzie-minesweeper';
}
