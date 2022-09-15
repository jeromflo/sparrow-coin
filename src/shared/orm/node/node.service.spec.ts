import { Test, TestingModule } from '@nestjs/testing';
import { NodeOrmService } from './node.orm.service';

describe('NodeService', () => {
  let service: NodeOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeOrmService],
    }).compile();

    service = module.get<NodeOrmService>(NodeOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
