import { PartialType } from '@nestjs/mapped-types';
import { CreateUlrShortenerDto } from './create-ulr_shortener.dto';

export class UpdateUlrShortenerDto extends PartialType(CreateUlrShortenerDto) {}
