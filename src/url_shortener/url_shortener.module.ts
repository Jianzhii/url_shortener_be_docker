import { Module } from '@nestjs/common';
import { UlrShortenerService } from './url_shortener.service';
import { UlrShortenerController } from './url_shortener.controller';

@Module({
    controllers: [UlrShortenerController],
    providers: [UlrShortenerService],
})
export class UlrShortenerModule {}
