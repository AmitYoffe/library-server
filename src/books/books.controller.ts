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

  @Get('writer/:writerId')
  findAllBooksByWriterId(@Param('writerId', ParseIntPipe) writerId: number) {
    return this.bookService.findAllById(writerId);
  }

  @Post()
  @IsAdmin()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    this.bookService.create(book);
  }

  @Get('borrow/:bookId')
  async getBorrowers(@Param('bookId', ParseIntPipe) bookId: number) {
    return await this.bookService.getBorrowersByBookId(bookId);
  }

  @Post(':bookId/borrow/:userId')
  async borrowBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    this.bookService.borrowBook(userId, bookId);
  }

  @Post(':bookId/return/:userId')
  async returnBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    this.bookService.returnBook(userId, bookId);
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
