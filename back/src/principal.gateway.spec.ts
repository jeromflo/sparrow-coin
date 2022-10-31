import { Test, TestingModule } from '@nestjs/testing';
import { PrincipalGateway } from './principal.gateway';

describe('PrincipalGateway', () => {
  let gateway: PrincipalGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrincipalGateway],
    }).compile();

    gateway = module.get<PrincipalGateway>(PrincipalGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
