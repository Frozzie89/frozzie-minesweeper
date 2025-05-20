import { Component } from '@angular/core';
import { GameService } from '../../service/game.service';
import { GameState } from '../../classes/game-state';
import { NgIf } from '@angular/common';
import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';


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
export class RetryComponent {

    constructor(private gameService: GameService) {
    }

    isShown(): boolean {
        return this.gameService.gameState === GameState.GAME_OVER
    }

    resetGame() {
        this.gameService.gameState = GameState.INIT
        this.gameService.initMatrix()
    }

    getTileCssClasses(): { [key: string]: boolean } {
        return {
            ' ': this.gameService.gameState === GameState.GAME_OVER,
            'not-shown': this.gameService.gameState !== GameState.GAME_OVER,
        };
    }


}
