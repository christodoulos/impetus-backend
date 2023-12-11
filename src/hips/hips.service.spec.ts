import { Test, TestingModule } from '@nestjs/testing';
import { HipsService } from './hips.service';

describe('HipsService', () => {
  let service: HipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HipsService],
    }).compile();

    service = module.get<HipsService>(HipsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
