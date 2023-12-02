import { Test, TestingModule } from '@nestjs/testing';
import { AtticaGreenController } from './attica-green.controller';

describe('AtticaGreenController', () => {
  let controller: AtticaGreenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtticaGreenController],
    }).compile();

    controller = module.get<AtticaGreenController>(AtticaGreenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
