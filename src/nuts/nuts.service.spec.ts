import { Test, TestingModule } from '@nestjs/testing';
import { NutsService } from './nuts.service';

describe('NutsService', () => {
  let service: NutsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NutsService],
    }).compile();

    service = module.get<NutsService>(NutsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
