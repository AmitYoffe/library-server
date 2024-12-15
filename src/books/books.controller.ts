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
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { IsAdmin } from 'src/auth';
import { UserAdminGuard } from 'src/users/userAdmin.guard';
import { BooksService } from './books.service';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Controller('books')
@UseGuards(UserAdminGuard)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  findAll(@Query(ValidationPipe) searchQuery: SearchBookDto) {
    return this.bookService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Get('borrow/:bookId')
  async getBorrowers(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.bookService.getBorrowersByBookId(bookId);
  }

  @Post()
  @IsAdmin()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    this.bookService.create(book);
  }

  @Post(':bookId/borrow')
  async borrowBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Req() request: Request,
  ) {
    this.bookService.borrowBook(request, bookId);
  }

  @Post(':bookId/return')
  async returnBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Req() request: Request,
  ) {
    this.bookService.returnBook(request, bookId);
  }

  @Patch(':id')
  @IsAdmin()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedBook: UpdateBookDto,
  ) {
    this.bookService.update(id, updatedBook);
  }

  @Delete(':id')
  @IsAdmin()
  delete(@Param('id', ParseIntPipe) id: number) {
    this.bookService.delete(id);
  }
}
