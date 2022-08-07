import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUlrShortenerDto } from './dto/create_url_shortener.dto';
import { UlrShortenerService } from './url_shortener.service';

@Controller('shorten')
export class UlrShortenerController {
    constructor(private readonly ulrShortenerService: UlrShortenerService) {}

    @Post()
    create(@Body() createUlrShortenerDto: CreateUlrShortenerDto) {
        try {
            return this.ulrShortenerService.create(createUlrShortenerDto);
        } catch (err) {
            throw err;
        }
    }

    @Get(':alias')
    findOne(@Param('alias') alias: string) {
        try {
            return this.ulrShortenerService.findOne(alias);
        } catch (err) {
            throw err;
        }
    }
}
