import { TestBed } from '@angular/core/testing';

import { NoguardGuard } from './noguard.guard';

describe('NoguardGuard', () => {
  let guard: NoguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
