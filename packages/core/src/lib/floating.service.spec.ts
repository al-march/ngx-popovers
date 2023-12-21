import { TestBed } from '@angular/core/testing';

import { FloatingService } from './floating.service';

describe('FloatingService', () => {
  let service: FloatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
