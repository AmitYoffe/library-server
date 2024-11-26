import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from 'src/books/books.repository';
import { UsersRepository } from 'src/users';
import { BorrowsRepository } from './borrows.repository';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    private readonly borrowsRepository: BorrowsRepository,
    private readonly booksRepository: BooksRepository,
    private readonly userRepository: UsersRepository,
  ) { }

  async borrowBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksRepository.findOne(bookId);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (book.count <= 0) {
      throw new NotFoundException(`No copies of the book are available for borrowing`);
    }

    book.count -= 1;

    await this.borrowsRepository.create({ userId, bookId });
    await this.booksRepository.update(bookId, book);
  }

  async returnBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksRepository.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // This crashes the server
    const borrowCount = await this.borrowsRepository.countUserBorrows({ bookId, userId });
    if (borrowCount === 0) {
      throw new BadRequestException('User did not borrow this book');
    }

    // This crashes the server
    const bookStockCount = book.count - borrowCount;
    if (bookStockCount <= 0) {
      throw new BadRequestException("Can't return book: no stock available");
    }

    book.count += 1;
    await this.booksRepository.update(bookId, book);
  }

  async getBorrowersByBook(bookId: number) {
    const borrowsByBookId = await this.borrowsRepository.getBorrowersByBook(bookId)
    if (borrowsByBookId.length === 0) {
      throw new NotFoundException("This book hasn't been borrowed yet");
    }

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = this.userRepository.findMany(userIds);

    return users;
  }
}