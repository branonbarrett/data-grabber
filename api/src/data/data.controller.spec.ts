import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';

describe('WorkItems Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DataController],
    }).compile();
  });

  it('should be defined', () => {
    const controller: DataController = module.get<DataController>(DataController);
    expect(controller).toBeDefined();
  });
});
