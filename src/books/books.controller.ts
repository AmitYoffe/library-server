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
    private readonly borrowsService: BorrowsService
  ) { }

  @Get()
  async findAll(@Query(ValidationPipe) searchQuery: SearchBookDto) {
    return await this.bookService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.findOne(id);
  }

  @Get('borrow/:bookId')
  getBorrowers(@Param('bookId', ParseIntPipe) bookId: number) {
    return this.borrowsService.getBorrowersByBook(bookId);
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    this.bookService.create(book);
  }

  // make these routes more RESTy - read about REST api conventions
  @Post('borrow/:bookId/:userId')
  borrow(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    this.borrowsService.borrowBook({ bookId, userId });
  }

  @Post('return/:bookId/:userId')
  return(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    this.borrowsService.returnBook({ bookId, userId });
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
