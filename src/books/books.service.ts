import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BorrowsService } from 'src/borrows/borrows.service';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/users';
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

  async returnBook(request: Request, bookId: number) {
    const book = await this.booksRepository.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    
    const user = this.userService.getUserFromRequestToken(request);

    const borrowCount = await this.borrowsService.countUserBorrows({ bookId, userId: user.id });
    if (borrowCount === 0) {
      throw new BadRequestException('User did not borrow this book');
    }

    const bookStockCount = book.count - borrowCount;
    if (bookStockCount <= 0) {
      throw new BadRequestException("Can't return book: no stock available");
    }

    book.count += 1;

    this.loggerService.logUserAction(user.username, `returned book with ID ${bookId}`);

    await this.booksRepository.update(bookId, book);
  }

  async borrowBook(request: Request, bookId: number) {
    const user = this.userService.getUserFromRequestToken(request);
    if (!user) {
      throw new BadRequestException('Invalid token. User not found.');
    }

    const book = await this.booksRepository.findOne(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    if (book.count <= 0) {
      throw new BadRequestException(`No copies of the book are available for borrowing`);
    }

    this.loggerService.logUserAction(user.username, `borrowed book with ID ${bookId}`);

    this.borrowsService.create({ userId: user.id, bookId }, book);
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

// fix count logic