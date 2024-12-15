import { Injectable, NotFoundException } from '@nestjs/common';
import { BookEntity } from 'src/books/book.entity';
import { BorrowsRepository } from './borrows.repository';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(private readonly borrowsRepository: BorrowsRepository) {}

  async countUserBorrows({ bookId, userId }: BorrowDto) {
    return this.borrowsRepository.countUserBorrows({ bookId, userId });
  }

  create(borrow: BorrowDto, book: BookEntity) {
    this.borrowsRepository.create(borrow, book);
  }

  getBorrowersByBookId(bookId: number) {
    return this.borrowsRepository.getBorrowersByBook(bookId);
  }
}
