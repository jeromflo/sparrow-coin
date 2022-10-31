import { Test, TestingModule } from '@nestjs/testing';
import { NodoBlockchainGateway } from './nodo-blockchain.gateway';

describe('NodoBlockchainGateway', () => {
  let gateway: NodoBlockchainGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodoBlockchainGateway],
    }).compile();

    gateway = module.get<NodoBlockchainGateway>(NodoBlockchainGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
