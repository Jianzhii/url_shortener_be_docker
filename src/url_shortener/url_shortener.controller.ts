import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUlrShortenerDto } from './dto/create_url_shortener.dto';
import { UlrShortenerService } from './url_shortener.service';

@Controller('shorten')
export class UlrShortenerController {
    constructor(private readonly ulrShortenerService: UlrShortenerService) {}

    @Post()
    async create(@Body() createUlrShortenerDto: CreateUlrShortenerDto) {
        try {
            return await this.ulrShortenerService.create(createUlrShortenerDto);
        } catch (err) {
            throw err;
        }
    }

    @Get(':alias')
    async findOne(@Param('alias') alias: string) {
        try {
            return await this.ulrShortenerService.findOne(alias);
        } catch (err) {
            throw err;
        }
    }
}
