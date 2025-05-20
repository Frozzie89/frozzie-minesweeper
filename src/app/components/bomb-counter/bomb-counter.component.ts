import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { GameService } from '../../service/game.service';

@Component({
    selector: 'app-bomb-counter',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './bomb-counter.component.html',
    styleUrl: './bomb-counter.component.scss'
})
export class BombCounterComponent {

    faBomb = faBomb

    constructor(private gameService: GameService) { }

    bombCount(): number {
        return this.gameService.difficulty.total_bombs - this.gameService.flaggedTiles
    }

}
