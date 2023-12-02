import { Test, TestingModule } from '@nestjs/testing';
import { AtticaGreenService } from './attica-green.service';

describe('AtticaGreenService', () => {
  let service: AtticaGreenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtticaGreenService],
    }).compile();

    service = module.get<AtticaGreenService>(AtticaGreenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
