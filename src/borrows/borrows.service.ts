import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    if (book.count <= 0) {
      throw new BadRequestException(`No copies of the book are available for borrowing`);
    }

    book.count -= 1

    const borrow = this.borrowsRepository.create({
      userId,
      book,
    });

    await this.booksRepository.save(book);
    return await this.borrowsRepository.save(borrow)
  }

  async returnBook({ bookId, userId }: CreateBorrowDto) {
    // CreateBorrowDto name is incorrect
    console.log(`UserId ${userId} returned bookId ${bookId} `)
  }

  async getBorrowersByBook(bookId: number) {
    const borrowsByBookId = await this.borrowsRepository
      .createQueryBuilder('borrow')
      .where('borrow.bookId = :bookId', { bookId })
      .getMany();

    // do not return reponses to the user!
    if (borrowsByBookId.length === 0) {
      throw new NotFoundException("This book hasn't been borrowed yet");
    }

    const userIds = borrowsByBookId.map(borrow => borrow.userId);
    const users = await this.userRepository.find({
      where: { id: In(userIds) },
      select: ['id', 'username', 'borrows']
      // why can't i see the borrows field?
    }
    );

    return users;
  }
}

// TYPEORM SHOULD NOT EXIST INSIDE SERVICES ! ! !
// IT SHOULD BE HIDDEN IN MY SECRET REPOSITORIES MUAHAHAHAH