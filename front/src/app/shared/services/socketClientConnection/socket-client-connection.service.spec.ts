import { TestBed } from '@angular/core/testing';

import { SocketClientConnectionService } from './socket-client-connection.service';

describe('SocketClientConnectionService', () => {
  let service: SocketClientConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketClientConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
