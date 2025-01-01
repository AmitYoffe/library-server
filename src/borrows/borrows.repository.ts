import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/book.entity';
import { IsNull, Repository } from 'typeorm';
import { BorrowEntity } from './borrow.entity';
import { BorrowDto } from './dto/borrow.dto';

@Injectable()
export class BorrowsRepository {
  constructor(
    @InjectRepository(BorrowEntity)
    private borrowsRepository: Repository<BorrowEntity>,
  ) {}

  create(borrow: BorrowDto, book: BookEntity) {
    const borrowEntity = this.borrowsRepository.create({
      userId: borrow.userId,
      book,
    });

    return this.borrowsRepository.save(borrowEntity);
  }

  return(borrowToUpdate: BorrowEntity) {
    borrowToUpdate.returnedAt = new Date();
    return this.borrowsRepository.save(borrowToUpdate);
  }

  async getBorrowersByBook(bookId: number) {
    return await this.borrowsRepository.find({
      where: {
        book: { id: bookId },
        returnedAt: IsNull(),
      },
    });
  }

  getBorrowsByUser(userId: number) {
    return this.borrowsRepository.find({
      where: {
        user: { id: userId },
        returnedAt: IsNull(),
      },
    });
  }
}
