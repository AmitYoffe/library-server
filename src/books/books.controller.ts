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
import { BorrowsService } from 'src/borrows/borrows.service';
import { BooksService } from './books.service';
import { UpdateBookDto , CreateBookDto} from './dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
    private readonly borrowsService: BorrowsService
  ) { }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.bookService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    return this.bookService.create(book);
  }

  @Post('borrow/:bookId/:userId')
  borrow(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number, // fake this userId for now
  ) {
    return this.borrowsService.borrowBook({ bookId, userId });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedBook: UpdateBookDto,
  ) {
    return this.bookService.update(id, updatedBook);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.delete(id);
  }
}
