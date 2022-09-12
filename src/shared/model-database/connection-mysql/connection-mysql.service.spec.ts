import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionMysqlService } from './connection-mysql.service';

describe('ConnectionMysqlService', () => {
  let service: ConnectionMysqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionMysqlService],
    }).compile();

    service = module.get<ConnectionMysqlService>(ConnectionMysqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
