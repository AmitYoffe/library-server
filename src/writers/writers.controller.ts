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
import { IsAdmin } from 'src/auth';

@Controller('writers')
export class WritersController {
  constructor(private readonly writerService: WritersService) { }

  @Get()
  findAll(@Query(ValidationPipe) searchQuery: SearchWriterDto) {
    return this.writerService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.writerService.findOne(id);
  }

  @Post()
  create(
    @IsAdmin()
    @Body(ValidationPipe) writer: CreateWriterDto) {
    this.writerService.create(writer);
  }

  @Patch(':id')
  update(
    @IsAdmin()
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedWriter: UpdateWriterDto,
  ) {
    this.writerService.update(id, updatedWriter);
  }

  @Delete(':id')
  delete(
    @IsAdmin()
    @Param('id', ParseIntPipe) id: number) {
    this.writerService.delete(id);
  }
}
