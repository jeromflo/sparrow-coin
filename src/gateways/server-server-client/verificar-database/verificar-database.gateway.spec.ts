import { Test, TestingModule } from '@nestjs/testing';
import { VerificarDatabaseGateway } from './verificar-database.gateway';

describe('VerificarDatabaseGateway', () => {
  let gateway: VerificarDatabaseGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VerificarDatabaseGateway],
    }).compile();

    gateway = module.get<VerificarDatabaseGateway>(VerificarDatabaseGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
