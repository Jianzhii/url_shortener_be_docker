import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUlrShortenerDto } from './dto/create_url_shortener.dto';
import { UlrShortenerEntity } from './entities/url_shortener.entity';
@Injectable()
export class UlrShortenerService {
    constructor(
        @InjectRepository(UlrShortenerEntity)
        private readonly urlShortenerRepository: Repository<UlrShortenerEntity>,
    ) {}
    async create(createUlrShortenerDto: CreateUlrShortenerDto) {
        if (createUlrShortenerDto.alias) {
        } else {
            const md5hash = createHash('md5')
                .update(createUlrShortenerDto.url)
                .digest('hex');
            // console.log(md5hash);
            const shortened = md5hash.slice(0, 7);
            console.log(shortened);
            console.log(Buffer.from(shortened));
        }

        const result = await this.urlShortenerRepository.save(
            Object.assign(new UlrShortenerEntity(), createUlrShortenerDto),
        );
        return {
            status: 200,
            message: `URL successfully shortened and saved!`,
            data: result,
        };
    }

    async findOne(alias: string) {
        const result = await this.urlShortenerRepository.findOne({
            where: {
                alias: alias,
            },
        });
        if (!result)
            throw new NotFoundException(
                `There is no long URL to redirect to. Please check that the short URL input is correct.`,
            );
        return {
            status: 200,
            message: `URL successfully retrieved`,
            data: result,
        };
    }
}
