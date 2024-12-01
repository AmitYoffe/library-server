import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { LoggerMiddleware } from 'src/middleware';
import { UserService } from 'src/users';
import { BorrowsRepository } from './borrows.repository';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    private readonly borrowsRepository: BorrowsRepository,
    private readonly booksService: BooksService,
    private readonly userService: UserService,
    private readonly loggingService: LoggerMiddleware
  ) { }

  async borrowBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksService.findOne(bookId);

    // if (!book) {
    //   throw new NotFoundException(`Book with ID ${bookId} not found`);
    // }

    if (book.count <= 0) {
      throw new NotFoundException(`No copies of the book are available for borrowing`);
    }

    // count -= 1;

    const user = await this.userService.findOneById(userId);
    // i should take the username from the token not from a user,
    //  here i am calling the db once again
    this.loggingService.logUserAction(user.username, `borrowed book with ID ${bookId}`);

    await this.borrowsRepository.create({ userId, bookId }, book);
    await this.booksService.update(bookId, { count: book.count - 1 });
  }

  async returnBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksService.findOne(bookId);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const borrowCount = await this.borrowsRepository.countUserBorrows({ bookId, userId });
    if (borrowCount === 0) {
      throw new BadRequestException('User did not borrow this book');
    }

    const bookStockCount = book.count - borrowCount;
    if (bookStockCount <= 0) {
      throw new BadRequestException("Can't return book: no stock available");
    }

    book.count += 1;

    const user = await this.userService.findOneById(userId);
    this.loggingService.logUserAction(user.username, `returned book with ID ${bookId}`);

    await this.booksService.update(bookId, book);
  }

  async getBorrowersByBook(bookId: number) {
    const borrowsByBookId = await this.borrowsRepository.getBorrowersByBook(bookId)
    if (borrowsByBookId.length === 0) {
      throw new NotFoundException("This book hasn't been borrowed yet");
    }

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = this.userService.findMany(userIds);

    return users;
  }
}