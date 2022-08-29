import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUrlShortenerDto } from './dto/create_url_shortener.dto';
import { DeleteUrlShortenerDto } from './dto/delete_url_shortener.dto';
import { UrlShortenerService } from './url_shortener.service';

@Controller('shorten')
export class UrlShortenerController {
    constructor(private readonly urlShortenerService: UrlShortenerService) {}

    @Post()
    async create(@Body() createUrlShortenerDto: CreateUrlShortenerDto) {
        try {
            const result = await this.urlShortenerService.create(
                createUrlShortenerDto,
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
            const result = await this.urlShortenerService.findOne(alias);
            return {
                status: 200,
                message: `URL successfully retrieved`,
                data: result,
            };
        } catch (err) {
            throw err;
        }
    }

    @Delete()
    async deleteAlias(@Body() deleteUrlShortenerDto: DeleteUrlShortenerDto) {
        try {
            const result = await this.urlShortenerService.deleteAlias(
                deleteUrlShortenerDto,
            );
            return {
                status: 200,
                message: `URL successfully deleted`,
                data: result,
            };
        } catch (err) {
            throw err;
        }
    }
}
