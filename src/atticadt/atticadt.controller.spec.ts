import { Test, TestingModule } from '@nestjs/testing';
import { AtticadtController } from './atticadt.controller';

describe('AtticadtController', () => {
  let controller: AtticadtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtticadtController],
    }).compile();

    controller = module.get<AtticadtController>(AtticadtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
