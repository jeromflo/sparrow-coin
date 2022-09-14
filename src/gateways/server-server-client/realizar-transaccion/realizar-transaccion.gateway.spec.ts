import { Test, TestingModule } from '@nestjs/testing';
import { RealizarTransaccionGateway } from './realizar-transaccion.gateway';

describe('RealizarTransaccionGateway', () => {
  let gateway: RealizarTransaccionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealizarTransaccionGateway],
    }).compile();

    gateway = module.get<RealizarTransaccionGateway>(RealizarTransaccionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
