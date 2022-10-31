import { Test, TestingModule } from '@nestjs/testing';
import { UnionTransaccionService } from './union-transaccion.service';

describe('UnionTransaccionService', () => {
  let service: UnionTransaccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnionTransaccionService],
    }).compile();

    service = module.get<UnionTransaccionService>(UnionTransaccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
