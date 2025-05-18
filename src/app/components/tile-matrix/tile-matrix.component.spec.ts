import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileMatrixComponent } from './tile-matrix.component';

describe('TileMatrixComponent', () => {
  let component: TileMatrixComponent;
  let fixture: ComponentFixture<TileMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileMatrixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
