import { Test, TestingModule } from '@nestjs/testing';
import { UlrShortenerService } from './ulr_shortener.service';

describe('UlrShortenerService', () => {
  let service: UlrShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UlrShortenerService],
    }).compile();

    service = module.get<UlrShortenerService>(UlrShortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
