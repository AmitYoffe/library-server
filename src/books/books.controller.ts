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
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';
import { IsAdmin } from 'src/auth';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) { }

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
  create(
    @IsAdmin()
    @Body(ValidationPipe) book: CreateBookDto) {
    this.bookService.create(book);
  }

  @Post('borrow/:bookId/:userId')
  async borrowBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    this.bookService.borrowBook({ bookId, userId });
  }

  @Post('return/:bookId/:userId')
  async returnBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    this.bookService.returnBook({ bookId, userId });
  }

  @Patch(':id')
  update(
    @IsAdmin()
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedBook: UpdateBookDto,
  ) {
    this.bookService.update(id, updatedBook);
  }

  @Delete(':id')
  delete(
    @IsAdmin()
    @Param('id', ParseIntPipe) id: number) {
    this.bookService.delete(id);
  }
}
