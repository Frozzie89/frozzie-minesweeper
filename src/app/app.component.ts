import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TileMatrixComponent } from './components/tile-matrix/tile-matrix.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TileMatrixComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'frozzie-minesweeper';
}
