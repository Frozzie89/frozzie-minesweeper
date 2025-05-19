import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileComponent } from './tile.component';
import { Tile } from '../../classes/tile';

describe('TileComponent', () => {
    let component: TileComponent;
    let fixture: ComponentFixture<TileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TileComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TileComponent);
        component = fixture.componentInstance;
        component.tile = new Tile(0, 0, true)
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
