import { Test, TestingModule } from '@nestjs/testing';
import { AtticadtService } from './atticadt.service';

describe('AtticadtService', () => {
  let service: AtticadtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AtticadtService],
    }).compile();

    service = module.get<AtticadtService>(AtticadtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
