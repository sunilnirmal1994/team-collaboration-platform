import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service.ts.service';

describe('SocketServiceTsService', () => {
  let service: SocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
