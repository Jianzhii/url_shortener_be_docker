import { Injectable } from '@nestjs/common';
import { CreateUlrShortenerDto } from './dto/create_url_shortener.dto';

@Injectable()
export class UlrShortenerService {
    create(createUlrShortenerDto: CreateUlrShortenerDto) {
        console.log(createUlrShortenerDto);
        return 'This action adds a new ulrShortener';
    }

    findOne(id: string) {
        return `This action returns a #${id} ulrShortener`;
    }
}
