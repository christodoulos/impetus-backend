import { Test, TestingModule } from '@nestjs/testing';
import { NutsController } from './nuts.controller';

describe('NutsController', () => {
  let controller: NutsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NutsController],
    }).compile();

    controller = module.get<NutsController>(NutsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
