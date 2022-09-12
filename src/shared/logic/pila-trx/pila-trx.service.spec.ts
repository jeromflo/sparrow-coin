import { Test, TestingModule } from '@nestjs/testing';
import { PilaTrxService } from './pila-trx.service';

describe('PilaTrxService', () => {
  let service: PilaTrxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PilaTrxService],
    }).compile();

    service = module.get<PilaTrxService>(PilaTrxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
