import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from 'src/books/books.repository';
import { UsersRepository } from 'src/users';
import { BorrowsRepository } from './borrows.repository';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    private borrowsRepository: BorrowsRepository,
    private booksRepository: BooksRepository,
    private userRepository: UsersRepository,
  ) { }

  async borrowBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksRepository.findOne(bookId);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (book.count <= 0) {
      throw new BadRequestException(`No copies of the book are available for borrowing`);
    }

    book.count -= 1;

    await this.borrowsRepository.create({ userId, bookId });

    return await this.booksRepository.update(bookId, book);
  }

  async returnBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksRepository.findOne(bookId);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    book.count += 1;
    await this.booksRepository.update(bookId, book);
    // Currently a user can return books that he didn't even borrow, and increse the count of the book.
    // Currently there is no connection between the borrows table and the books table...
    console.log(`UserId ${userId} returned bookId ${bookId} `)
  }

  async getBorrowersByBook(bookId: number) {
    const borrowsByBookId = await this.borrowsRepository.getBorrowersByBook(bookId)

    // do not return reponses to the user!
    if (borrowsByBookId.length === 0) {
      throw new NotFoundException("This book hasn't been borrowed yet");
    }

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = await this.userRepository.findMany(userIds);

    return users;
  }
}
