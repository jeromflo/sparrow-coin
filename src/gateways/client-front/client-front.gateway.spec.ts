import { Test, TestingModule } from '@nestjs/testing';
import { ClientFrontGateway } from './client-front.gateway';

describe('ClientFrontGateway', () => {
  let gateway: ClientFrontGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientFrontGateway],
    }).compile();

    gateway = module.get<ClientFrontGateway>(ClientFrontGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
