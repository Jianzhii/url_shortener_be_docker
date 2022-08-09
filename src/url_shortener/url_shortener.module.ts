import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortenerEntity } from './entities/url_shortener.entity';
import { UrlShortenerController } from './url_shortener.controller';
import { UrlShortenerService } from './url_shortener.service';

@Module({
    imports: [TypeOrmModule.forFeature([UrlShortenerEntity])],
    controllers: [UrlShortenerController],
    providers: [UrlShortenerService],
})
export class UlrShortenerModule {}
