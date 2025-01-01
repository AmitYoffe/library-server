import { BadRequestException, Injectable } from '@nestjs/common';
import { BorrowsService } from 'src/borrows/borrows.service';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/users';
import { BookEntity } from './book.entity';
import { BooksRepository } from './books.repository';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly borrowsService: BorrowsService,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}

  findAll({ title, id }: SearchBookDto): Promise<BookEntity[]> {
    return this.booksRepository.findAll({ title, id });
  }

  findOne(id: number) {
    return this.booksRepository.findOne(id);
  }

  findAllBooksByWriterId(writerId: number) {
    return this.booksRepository.findAllBooksByWriterId(writerId);
  }

  async findAllBorrowedBooksByUserId(userId: number) {
    const borrows = await this.borrowsService.getBorrowsByUserId(userId);
    return this.booksRepository.findAllBorrowedBooksByUserId(borrows, userId);
  }

  create(bookDto: CreateBookDto) {
    this.booksRepository.create(bookDto);
  }

  async update(id: number, updatedBookDto: UpdateBookDto) {
    await this.booksRepository.update(id, updatedBookDto);
  }

  delete(id: number) {
    this.booksRepository.delete(id);
  }

  async returnBook(userId: number, bookId: number) {
    const book = await this.booksRepository.findOne(bookId);
    const borrower = await this.userService.findOneById(userId);

    if (!borrower) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    const borrowsByBookId =
      await this.borrowsService.getBorrowersByBookId(bookId);

    const borrowsToUpdate = borrowsByBookId.filter(
      (borrow) => borrow.userId === borrower.id && borrow.returnedAt === null,
    );

    if (borrowsToUpdate.length === 0) {
      throw new BadRequestException(
        `User "${borrower.username}" isn't currently borrowing ${book.title}`,
      );
    }
    const returnedBorrow = borrowsToUpdate[0];

    this.loggerService.logUserAction(
      borrower.username,
      `returned "${book.title}"`,
    );
    this.borrowsService.return(returnedBorrow);
  }

  async borrowBook(userId: number, bookId: number) {
    const borrower = await this.userService.findOneById(userId);
    const book = await this.booksRepository.findOne(bookId);

    if (!borrower) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    if (!book) {
      throw new BadRequestException(`Book with ID ${bookId} not found`);
    }

    this.loggerService.logUserAction(
      borrower.username,
      `borrowed "${book.title}"`,
    );

    this.borrowsService.create(
      { userId: borrower.id, bookId, returnedAt: null },
      book,
    );
  }

  async getBorrowersByBookId(bookId: number) {
    const borrowsByBookId =
      await this.borrowsService.getBorrowersByBookId(bookId);

    const userIds = borrowsByBookId.map((borrow) => borrow.userId);
    const users = this.userService.findManyByIds(userIds);

    return users;
  }

  async getBorrowsCount(bookId: number) {
    const borrowsByBookId =
      await this.borrowsService.getBorrowersByBookId(bookId);

    return borrowsByBookId.length;
  }
}
