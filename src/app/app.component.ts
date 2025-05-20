import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileMatrixComponent } from './components/tile-matrix/tile-matrix.component';
import { BombCounterComponent } from "./components/bomb-counter/bomb-counter.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TileMatrixComponent, BombCounterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'frozzie-minesweeper';
}
