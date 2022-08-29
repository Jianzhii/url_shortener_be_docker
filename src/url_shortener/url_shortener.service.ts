import {
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Base62Str from 'base62str';
import { createHash } from 'crypto';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { CreateUrlShortenerDto } from './dto/create_url_shortener.dto';
import { DeleteUrlShortenerDto } from './dto/delete_url_shortener.dto';
import { UrlShortenerEntity } from './entities/url_shortener.entity';
const { uuid } = require('uuidv4');
@Injectable()
export class UrlShortenerService {
    constructor(
        @InjectRepository(UrlShortenerEntity)
        private readonly urlShortenerRepository: Repository<UrlShortenerEntity>,
    ) {}
    async create(createUrlShortenerDto: CreateUrlShortenerDto) {
        if (createUrlShortenerDto.alias) {
            const isDuplicated = await this.checkDuplication(
                createUrlShortenerDto.alias,
            );
            if (isDuplicated) {
                throw new NotAcceptableException(
                    `This alias has already been used by someone. Please choose another alias.`,
                );
            }
        } else {
            let alias = this.generateHash();
            while (await this.checkDuplication(alias)) {
                alias = this.generateHash();
            }
            createUrlShortenerDto.alias = alias;
        }

        const token = uuid();
        createUrlShortenerDto['token'] = token;
        const result = await this.urlShortenerRepository.save(
            Object.assign(new UrlShortenerEntity(), createUrlShortenerDto),
        );
        result.alias = process.env.DOMAIN_NAME + result.alias;
        return result;
    }

    generateHash() {
        const md5hash = createHash('md5')
            .update(moment().format(`YYYYMMDDHHmmSSSSSSSSS`))
            .digest('hex');
        const shortened = md5hash.slice(0, 5);
        const base62 = Base62Str.createInstance();
        return base62.encodeStr(shortened);
    }

    async findOne(alias: string) {
        const result = await this.checkDuplication(alias);
        if (!result)
            throw new NotFoundException(
                `There is no long URL to redirect to. Please check that the short URL input is correct.`,
            );
        return result;
    }

    async checkDuplication(alias) {
        return await this.urlShortenerRepository.findOne({
            where: {
                alias: alias,
            },
        });
    }

    async deleteAlias(deleteUrlShortenerDto: DeleteUrlShortenerDto) {
        const result = await this.findOne(deleteUrlShortenerDto.alias);
        if (deleteUrlShortenerDto.token !== result.token) {
            throw new NotAcceptableException(
                `Token does not match the issued token for this alias. Please check your input.`,
            );
        }
        await this.urlShortenerRepository.delete(result.id);
    }

    async clearAll() {
        await this.urlShortenerRepository.clear();
    }
}
