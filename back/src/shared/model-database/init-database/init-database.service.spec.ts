import { Test, TestingModule } from '@nestjs/testing';
import { InitDatabaseService } from './init-database.service';

describe('InitDatabaseService', () => {
  let service: InitDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InitDatabaseService],
    }).compile();

    service = module.get<InitDatabaseService>(InitDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
