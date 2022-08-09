import { IsDefined, IsOptional, IsUrl } from 'class-validator';

export class CreateUrlShortenerDto {
    @IsOptional()
    alias: string;

    @IsDefined()
    @IsUrl()
    long_url: string;
}
