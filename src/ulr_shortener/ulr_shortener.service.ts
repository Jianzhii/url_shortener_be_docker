import { Injectable } from '@nestjs/common';
import { CreateUlrShortenerDto } from './dto/create-ulr_shortener.dto';
import { UpdateUlrShortenerDto } from './dto/update-ulr_shortener.dto';

@Injectable()
export class UlrShortenerService {
    create(createUlrShortenerDto: CreateUlrShortenerDto) {
        return 'This action adds a new ulrShortener';
    }

    findAll() {
        return `This action returns all ulrShortener`;
    }

    findOne(id: number) {
        return `This action returns a #${id} ulrShortener`;
    }

    update(id: number, updateUlrShortenerDto: UpdateUlrShortenerDto) {
        return `This action updates a #${id} ulrShortener`;
    }

    remove(id: number) {
        return `This action removes a #${id} ulrShortener`;
    }
}
