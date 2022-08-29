import { IsDefined } from 'class-validator';

export class DeleteUrlShortenerDto {
    @IsDefined()
    alias: string;

    @IsDefined()
    token: string;
}
