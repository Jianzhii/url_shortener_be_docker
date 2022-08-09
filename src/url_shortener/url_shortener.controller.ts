import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUlrShortenerDto } from './dto/create_url_shortener.dto';
import { UlrShortenerService } from './url_shortener.service';

@Controller('shorten')
export class UlrShortenerController {
    constructor(private readonly ulrShortenerService: UlrShortenerService) {}

    @Post()
    async create(@Body() createUlrShortenerDto: CreateUlrShortenerDto) {
        try {
            const result = await this.ulrShortenerService.create(
                createUlrShortenerDto,
            );
            return {
                status: 200,
                message: `URL successfully shortened and saved!`,
                data: result,
            };
        } catch (err) {
            throw err;
        }
    }

    @Get(':alias')
    async findOne(@Param('alias') alias: string) {
        try {
            const result = await this.ulrShortenerService.findOne(alias);
            return {
                status: 200,
                message: `URL successfully retrieved`,
                data: result,
            };
        } catch (err) {
            throw err;
        }
    }
}
