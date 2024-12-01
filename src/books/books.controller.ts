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
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly bookService: BooksService,
    private readonly borrowsService: BorrowsService // where to push the borrowsService logic into ?
  ) { }

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
    return await this.borrowsService.getBorrowersByBook(bookId);
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    this.bookService.create(book);
  }

  @Post('borrow/:bookId/:userId')
  async borrow(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.borrowsService.borrowBook({ bookId, userId });
  }

  @Post('return/:bookId/:userId')
  async return(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    await this.borrowsService.returnBook({ bookId, userId });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatedBook: UpdateBookDto,
  ) {
    this.bookService.update(id, updatedBook);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    this.bookService.delete(id);
  }
}
