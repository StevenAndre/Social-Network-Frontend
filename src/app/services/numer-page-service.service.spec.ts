import { TestBed } from '@angular/core/testing';

import { NumerPAgeServiceService } from './numer-page-service.service';

describe('NumerPAgeServiceService', () => {
  let service: NumerPAgeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumerPAgeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
