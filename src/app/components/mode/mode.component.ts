import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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

}
