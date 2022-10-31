import { Test, TestingModule } from '@nestjs/testing';
import { SincronizarCadenaGateway } from './sincronizar-cadena.gateway';

describe('SincronizarCadenaGateway', () => {
  let gateway: SincronizarCadenaGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SincronizarCadenaGateway],
    }).compile();

    gateway = module.get<SincronizarCadenaGateway>(SincronizarCadenaGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
