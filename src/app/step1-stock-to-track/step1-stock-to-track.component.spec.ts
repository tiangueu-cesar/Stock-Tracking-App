import { ComponentFixture, TestBed } from '@angular/core/testing';

import { STEP1StockToTrackComponent } from './step1-stock-to-track.component';

describe('STEP1StockToTrackComponent', () => {
  let component: STEP1StockToTrackComponent;
  let fixture: ComponentFixture<STEP1StockToTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ STEP1StockToTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(STEP1StockToTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
