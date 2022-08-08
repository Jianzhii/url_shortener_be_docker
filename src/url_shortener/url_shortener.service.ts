import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Base62Str from 'base62str';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUlrShortenerDto } from './dto/create_url_shortener.dto';
import { UlrShortenerEntity } from './entities/url_shortener.entity';
import * as moment from 'moment';
@Injectable()
export class UlrShortenerService {
    constructor(
        @InjectRepository(UlrShortenerEntity)
        private readonly urlShortenerRepository: Repository<UlrShortenerEntity>,
    ) {}
    async create(createUlrShortenerDto: CreateUlrShortenerDto) {
        if (createUlrShortenerDto.alias) {
            const isDuplicated = await this.checkDuplication(
                createUlrShortenerDto.alias,
                createUlrShortenerDto.long_url,
            );
            if (isDuplicated) {
                throw new NotAcceptableException(
                    `This alias has already been used by someone. Please choose another alias.`,
                );
            }
        } else {
            const md5hash = createHash('md5')
                .update(moment().format(`YYYYMMDDHHmmSSSSSSSSS`))
                .digest('hex');
            const shortened = md5hash.slice(0, 5);
            const alias = this.base62Encode(shortened);
            createUlrShortenerDto.alias = alias;
        }
        const result = await this.urlShortenerRepository.save(
            Object.assign(new UlrShortenerEntity(), createUlrShortenerDto),
        );
        result.alias = process.env.DOMAIN_NAME + result.alias;
        return {
            status: 200,
            message: `URL successfully shortened and saved!`,
            data: result,
        };
    }

    base62Encode(text) {
        const base62 = Base62Str.createInstance();
        return base62.encodeStr(text);
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

    async checkDuplication(alias, longUrl) {
        const result = await this.urlShortenerRepository.findOne({
            where: {
                alias: alias,
            },
        });
        return result ? result.long_url === longUrl : false;
    }
}
