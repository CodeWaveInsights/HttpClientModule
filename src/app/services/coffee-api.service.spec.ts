import { TestBed } from '@angular/core/testing';

import { CoffeeApiService } from './coffee-api.service';

describe('CoffeeApiService', () => {
  let service: CoffeeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
