import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentQuoteDataComponent } from './current-quote-data.component';

describe('CurrentQuoteDataComponent', () => {
  let component: CurrentQuoteDataComponent;
  let fixture: ComponentFixture<CurrentQuoteDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentQuoteDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentQuoteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
