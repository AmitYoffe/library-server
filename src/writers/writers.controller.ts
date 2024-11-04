import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import Writer from './model';
import { WritersService } from './writers.service';

@Controller('writers')
export class WritersController {
  constructor(private readonly writerService: WritersService) {}

  @Get()
  findAll(@Query('search') search?: string) {
    return this.writerService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writerService.findOne(id);
  }

  @Post()
  create(@Body() writer: Writer) {
    return this.writerService.create(writer);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedWriter: Omit<Writer, 'id'>) {
    return this.writerService.update(id, updatedWriter);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.writerService.delete(id);
  }
}
