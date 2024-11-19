import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/book.entity';
import { Repository } from 'typeorm';
import { BorrowEntity } from './borrow.entity';
import CreateBorrowDto from './dto/create-borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(BorrowEntity)
    private borrowsRepository: Repository<BorrowEntity>,

    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,
  ) { }

  async borrowBook({ bookId, userId }: CreateBorrowDto) {
    const book = await this.booksRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const borrow = this.borrowsRepository.create({
      userId,
      book,
    });

    return await this.borrowsRepository.save(borrow)
  }
}
