import { TestBed } from '@angular/core/testing';

import { DifficultService } from './difficult.service';

describe('DifficultService', () => {
  let service: DifficultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DifficultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
