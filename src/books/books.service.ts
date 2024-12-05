import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/users';
import { BooksRepository } from './books.repository';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';
import { BorrowsService } from 'src/borrows/borrows.service';
import { BorrowDto } from 'src/borrows/dto/borrow.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly borrowsService: BorrowsService,
    private readonly userService: UserService,
  ) { }

  findAll({ title, id }: SearchBookDto) {
    return this.booksRepository.findAll({ title, id });
  }

  findOne(id: number) {
    const book = this.booksRepository.findOne(id);
    if (!book) throw new NotFoundException(`Book With Id of ${id} Not Found`);

    return book;
  }

  create(bookDto: CreateBookDto) {
    this.booksRepository.create(bookDto)
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    const updatedBook = await this.booksRepository.update(id, updatedBookDto);

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  delete(id: number) {
    this.booksRepository.delete(id);
  }

  async returnBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksRepository.findOne(bookId);

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const borrowCount = await this.borrowsService.countUserBorrows({ bookId, userId });
    if (borrowCount === 0) {
      throw new BadRequestException('User did not borrow this book');
    }

    const bookStockCount = book.count - borrowCount;
    if (bookStockCount <= 0) {
      throw new BadRequestException("Can't return book: no stock available");
    }

    book.count += 1;

    const _ = await this.userService.findOneById(userId);
    // this.loggingService.logUserAction(user.username, `returned book with ID ${bookId}`);

    await this.booksRepository.update(bookId, book);
  }

  async borrowBook({ bookId, userId }: BorrowDto) {
    const book = await this.booksRepository.findOne(bookId);

    // if (!book) {
    //   throw new NotFoundException(`Book with ID ${bookId} not found`);
    // }

    if (book.count <= 0) {
      throw new NotFoundException(`No copies of the book are available for borrowing`);
    }

    // count -= 1;

    // const _ = await this.userService.findOneById(userId);
    // i should take the username from the token not from a user,
    //  here i am calling the db once again
    // this.loggingService.logUserAction(user.username, `borrowed book with ID ${bookId}`);

    this.borrowsService.create({ userId, bookId }, book);
    await this.booksRepository.update(bookId, { count: book.count - 1 });
  }

  async getBorrowersByBookId(bookId: number) {
    const borrowsByBookId = await this.borrowsService.getBorrowersByBookId(bookId)
    if (borrowsByBookId.length === 0) {
      throw new NotFoundException("This book hasn't been borrowed yet");
    }

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = this.userService.findManyByIds(userIds);

    return users;
  }
}
