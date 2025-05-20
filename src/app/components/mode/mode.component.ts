import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Mode } from '../../classes/mode';
import { GameService } from '../../service/game.service';


@Component({
    selector: 'app-mode',
    standalone: true,
    imports: [MatButtonToggleModule, FontAwesomeModule],
    templateUrl: './mode.component.html',
    styleUrl: './mode.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModeComponent {

    faBomb = faBomb
    faFlag = faFlag

    mode: Mode = Mode.REVEALING

    constructor(private gameService: GameService) { }

    onToggleModeChange(event: MatButtonToggleChange) {
        if (this.gameService.mode === Mode.REVEALING) {
            this.gameService.mode = Mode.FLAGGING
        } else {
            this.gameService.mode = Mode.REVEALING
        }

    }
}
