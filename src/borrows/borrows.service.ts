import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from 'src/books/book.entity';
import { UserEntity } from 'src/users';
import { In, Repository } from 'typeorm';
import { BorrowEntity } from './borrow.entity';
import CreateBorrowDto from './dto/create-borrow.dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(BorrowEntity)
    private borrowsRepository: Repository<BorrowEntity>,

    @InjectRepository(BookEntity)
    private booksRepository: Repository<BookEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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

  async getBorrowersByBook(bookId: number) {
    const borrowsByBookId = await this.borrowsRepository
      .createQueryBuilder('borrow')
      .where('borrow.bookId = :bookId', { bookId })
      .getMany();

    if (borrowsByBookId.length === 0) {
      throw new NotFoundException("This book hasn't been borrowed yet");
    }

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
      select: ['id', 'username', 'borrows']
      // take users without their isAdmin + password fields
    }
    );

    return users;
  }
}
