import { TestBed } from '@angular/core/testing';

import { StockTrackingAppService } from './stock-tracking-app.service';

describe('StockTrackingAppService', () => {
  let service: StockTrackingAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTrackingAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
