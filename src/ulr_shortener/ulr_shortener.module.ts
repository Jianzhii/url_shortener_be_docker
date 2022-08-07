import { Module } from '@nestjs/common';
import { UlrShortenerService } from './ulr_shortener.service';
import { UlrShortenerController } from './ulr_shortener.controller';

@Module({
  controllers: [UlrShortenerController],
  providers: [UlrShortenerService]
})
export class UlrShortenerModule {}
