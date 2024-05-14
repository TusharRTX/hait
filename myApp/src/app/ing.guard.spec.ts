import { TestBed } from '@angular/core/testing';

import { IngGuard } from './ing.guard';

describe('IngGuard', () => {
  let guard: IngGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IngGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
