import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/books/book.entity';
import { BorrowEntity } from './borrow.entity';
import { BorrowsRepository } from './borrows.repository';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(private readonly borrowsRepository: BorrowsRepository) {}

  create(borrow: BorrowDto, book: BookEntity) {
    this.borrowsRepository.create(borrow, book);
  }

  async return(borrowToUpdate: BorrowEntity) {
    await this.borrowsRepository.return(borrowToUpdate);
  }

  getBorrowersByBookId(bookId: number) {
    return this.borrowsRepository.getBorrowersByBook(bookId);
  }

  getBorrowsByUserId(userId: number) {
    return this.borrowsRepository.getBorrowsByUser(userId);
  }
}
