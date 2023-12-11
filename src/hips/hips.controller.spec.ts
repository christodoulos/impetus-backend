import { Test, TestingModule } from '@nestjs/testing';
import { HipsController } from './hips.controller';

describe('HipsController', () => {
  let controller: HipsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HipsController],
    }).compile();

    controller = module.get<HipsController>(HipsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
