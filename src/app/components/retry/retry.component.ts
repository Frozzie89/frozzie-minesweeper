import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import { GameState } from '../../classes/game-state';
import { NgIf } from '@angular/common';
import {
    trigger,
    style,
    transition,
    animate
} from '@angular/animations';
import { filter, Subscription } from 'rxjs';


@Component({
    selector: 'app-retry',
    imports: [NgIf],
    standalone: true,
    templateUrl: './retry.component.html',
    styleUrl: './retry.component.scss',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('500ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('500ms ease-out', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class RetryComponent implements OnInit {

    private sub = new Subscription()
    showRetry: boolean = false

    constructor(private gameService: GameService) {
    }

    ngOnInit(): void {
        this.sub = this.gameService.gameState$
            .pipe(filter(state => state === GameState.GAME_OVER))
            .subscribe(() => {
                setTimeout(() => {
                    this.showRetry = true;
                }, 2000);
            });
    }

    resetGame() {
        this.gameService.setGameState(GameState.INIT)
        this.gameService.initMatrix()
    }

}
