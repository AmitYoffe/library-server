import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WritersService } from './writers.service';

@Controller('writers')
export class WritersController {
  constructor(private readonly writerService: WritersService) { }

  @Get()
  async findAll(@Query(ValidationPipe) searchQuery: SearchWriterDto) {
    return await this.writerService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.writerService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) writer: CreateWriterDto) {
    return this.writerService.create(writer);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedWriter: UpdateWriterDto,
  ) {
    return this.writerService.update(id, updatedWriter);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.writerService.delete(id);
  }
}
