import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UlrShortenerEntity } from './entities/url_shortener.entity';
import { UlrShortenerController } from './url_shortener.controller';
import { UlrShortenerService } from './url_shortener.service';

@Module({
    imports: [TypeOrmModule.forFeature([UlrShortenerEntity])],
    controllers: [UlrShortenerController],
    providers: [UlrShortenerService],
})
export class UlrShortenerModule {}
