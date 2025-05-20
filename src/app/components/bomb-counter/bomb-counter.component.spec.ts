import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombCounterComponent } from './bomb-counter.component';

describe('BombCounterComponent', () => {
  let component: BombCounterComponent;
  let fixture: ComponentFixture<BombCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BombCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BombCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
