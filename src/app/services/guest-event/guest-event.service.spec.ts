import { TestBed } from '@angular/core/testing';

import { GuestEventService } from './guest-event.service';

describe('GuestEventService', () => {
  let service: GuestEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
