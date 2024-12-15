import { BadRequestException, Injectable } from '@nestjs/common';
import { BorrowsService } from 'src/borrows/borrows.service';
import { LoggerService } from 'src/logger/logger.service';
import { UserEntity, UserService } from 'src/users';
import { BooksRepository } from './books.repository';
import { CreateBookDto, SearchBookDto, UpdateBookDto } from './dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly borrowsService: BorrowsService,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService
  ) { }

  findAll({ title, id }: SearchBookDto) {
    return this.booksRepository.findAll({ title, id });
  }

  findOne(id: number) {
    return this.booksRepository.findOne(id);
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

  async returnBook(request: Request, bookId: number) {
    const book = await this.booksRepository.findOne(bookId);
    const user: UserEntity = this.userService.getUserFromRequestToken(request);

    const borrowCount = await this.borrowsService.countUserBorrows({ bookId, userId: user.id });
    if (borrowCount === 0) {
      throw new BadRequestException(`${user.username} did not borrow this book`);
    }

    const bookStockCount = book.count - borrowCount;
    if (bookStockCount <= 0) {
      throw new BadRequestException("Can't return book: no stock available");
    }

    book.count += 1;

    this.loggerService.logUserAction(user.username, `returned "${book.title}"`);
    await this.booksRepository.update(bookId, book);
  }

  async borrowBook(request: Request, bookId: number) {
    const user: UserEntity = this.userService.getUserFromRequestToken(request);
    const book = await this.booksRepository.findOne(bookId);

    if (book.count <= 0) {
      throw new BadRequestException(`No copies of the book "${book.title}" are available for borrowing`);
    }

    this.loggerService.logUserAction(user.username, `borrowed "${book.title}"`);

    this.borrowsService.create({ userId: user.id, bookId }, book);
    await this.booksRepository.update(bookId, { count: book.count - 1 });
  }

  async getBorrowersByBookId(bookId: number) {
    const borrowsByBookId = await this.borrowsService.getBorrowersByBookId(bookId)

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = this.userService.findManyByIds(userIds);

    return users;
  }
}

// fix count logic