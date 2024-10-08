import { TestBed } from '@angular/core/testing';

import { TaskEffectsService } from './task.effects.service';

describe('TaskEffectsService', () => {
  let service: TaskEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
