import { TestBed } from '@angular/core/testing';

import { GoalManagerService } from './goal-manager.service';

describe('GoalManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoalManagerService = TestBed.get(GoalManagerService);
    expect(service).toBeTruthy();
  });
});
