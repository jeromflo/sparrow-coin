import { Test, TestingModule } from '@nestjs/testing';
import { ServerServerClientGateway } from './server-server-client.gateway';

describe('ServerServerClientGateway', () => {
  let gateway: ServerServerClientGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerServerClientGateway],
    }).compile();

    gateway = module.get<ServerServerClientGateway>(ServerServerClientGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
