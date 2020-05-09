import { TestBed } from '@angular/core/testing';

import { NotesManagerService } from './notes-manager.service';

describe('NotesManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesManagerService = TestBed.get(NotesManagerService);
    expect(service).toBeTruthy();
  });
});
