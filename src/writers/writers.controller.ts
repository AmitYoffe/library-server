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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateWriterDto, SearchWriterDto, UpdateWriterDto } from './dto';
import { WritersService } from './writers.service';
import { IsAdmin } from 'src/auth';
import { UserAdminGuard } from 'src/users/userAdmin.guard';

@Controller('writers')
@UseGuards(UserAdminGuard)
export class WritersController {
  constructor(private readonly writerService: WritersService) {}

  @Get()
  findAll(@Query(ValidationPipe) searchQuery: SearchWriterDto) {
    return this.writerService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.writerService.findOne(id);
  }

  @Post()
  @IsAdmin()
  create(@Body(ValidationPipe) writer: CreateWriterDto) {
    this.writerService.create(writer);
  }

  @Patch(':id')
  @IsAdmin()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedWriter: UpdateWriterDto,
  ) {
    this.writerService.update(id, updatedWriter);
  }

  @Delete(':id')
  @IsAdmin()
  delete(@Param('id', ParseIntPipe) id: number) {
    this.writerService.delete(id);
  }
}
