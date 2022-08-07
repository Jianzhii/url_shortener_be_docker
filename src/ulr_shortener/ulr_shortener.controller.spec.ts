import { Test, TestingModule } from '@nestjs/testing';
import { UlrShortenerController } from './ulr_shortener.controller';
import { UlrShortenerService } from './ulr_shortener.service';

describe('UlrShortenerController', () => {
    let controller: UlrShortenerController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UlrShortenerController],
            providers: [UlrShortenerService],
        }).compile();

        controller = module.get<UlrShortenerController>(UlrShortenerController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
