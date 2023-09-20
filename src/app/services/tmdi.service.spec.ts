import { TestBed } from '@angular/core/testing';

import { TmdiService } from './tmdi.service';

describe('TmdiService', () => {
  let service: TmdiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
