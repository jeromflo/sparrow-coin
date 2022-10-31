import { Test, TestingModule } from '@nestjs/testing';
import { GetTransaccionGateway } from './transaccion.gateway';

describe('GetTransaccionGateway', () => {
  let gateway: GetTransaccionGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetTransaccionGateway],
    }).compile();

    gateway = module.get<GetTransaccionGateway>(GetTransaccionGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
