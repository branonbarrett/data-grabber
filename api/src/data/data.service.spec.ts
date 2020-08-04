import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';

describe('WorkItemsService', () => {
  let service: DataService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();
    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
