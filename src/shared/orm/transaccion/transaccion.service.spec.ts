import { Test, TestingModule } from '@nestjs/testing';
import { TransaccionORMService } from './transaccion.orm.service';

describe('TransaccionService', () => {
  let service: TransaccionORMService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransaccionORMService],
    }).compile();

    service = module.get<TransaccionORMService>(TransaccionORMService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
