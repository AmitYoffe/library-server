import { BadRequestException, Injectable } from '@nestjs/common';
import { BorrowsService } from 'src/borrows/borrows.service';
import { LoggerService } from 'src/logger/logger.service';
import { UserEntity, UserService } from 'src/users';
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

  findAllById(writerId: number) {
    return this.booksRepository.findAllById(writerId);
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

    const borrowsByBookId =
      await this.borrowsService.getBorrowersByBookId(bookId);

    const borrowsToUpdate = borrowsByBookId.filter(
      (borrow) => borrow.userId === user.id && borrow.returnedAt === null,
    );

    if (borrowsToUpdate.length === 0) {
      throw new BadRequestException(
        `User "${user.username}" isn't currently borrowing ${book.title}`,
      );
    }

    const returnedBorrow = borrowsToUpdate[0];

    this.loggerService.logUserAction(user.username, `returned "${book.title}"`);
    this.borrowsService.return(returnedBorrow);
  }

  async borrowBook(request: Request, bookId: number) {
    const user = this.userService.getUserFromRequestToken(request);

    const book = await this.booksRepository.findOne(bookId);

    if (!book) {
      throw new BadRequestException(`Book with ID ${bookId} not found`);
    }

    this.loggerService.logUserAction(user.username, `borrowed "${book.title}"`);

    this.borrowsService.create(
      { userId: user.id, bookId, returnedAt: null },
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
}
