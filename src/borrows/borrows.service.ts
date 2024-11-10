import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { Repository } from 'typeorm';
import { Borrow } from './borrow.entity';
import CreateBorrowDto from './dto/create-borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrow)
    private borrowsRepository: Repository<Borrow>,

    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) { }

  async borrowBook(borrowDto: CreateBorrowDto) {
    const { bookId, userId } = borrowDto;
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
