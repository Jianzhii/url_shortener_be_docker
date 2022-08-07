import { IsDefined, IsOptional, IsUrl } from 'class-validator';

export class CreateUlrShortenerDto {
    @IsOptional()
    alias: string;

    @IsDefined()
    @IsUrl()
    url: string;
}
