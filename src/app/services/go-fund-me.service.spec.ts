import { TestBed } from '@angular/core/testing';

import { GoFundMeService } from './go-fund-me.service';

describe('GoFundMeService', () => {
  let service: GoFundMeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoFundMeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
