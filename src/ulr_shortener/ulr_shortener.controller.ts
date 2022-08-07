import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UlrShortenerService } from './ulr_shortener.service';
import { CreateUlrShortenerDto } from './dto/create-ulr_shortener.dto';
import { UpdateUlrShortenerDto } from './dto/update-ulr_shortener.dto';

@Controller('ulr-shortener')
export class UlrShortenerController {
  constructor(private readonly ulrShortenerService: UlrShortenerService) {}

  @Post()
  create(@Body() createUlrShortenerDto: CreateUlrShortenerDto) {
    return this.ulrShortenerService.create(createUlrShortenerDto);
  }

  @Get()
  findAll() {
    return this.ulrShortenerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ulrShortenerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUlrShortenerDto: UpdateUlrShortenerDto) {
    return this.ulrShortenerService.update(+id, updateUlrShortenerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ulrShortenerService.remove(+id);
  }
}
