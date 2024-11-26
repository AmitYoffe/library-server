import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, UserEntity } from 'src';
import { BooksRepository } from 'src/books/books.repository';
import { UsersRepository } from 'src/users';
import { BorrowEntity } from './borrow.entity';
import { BorrowsRepository } from './borrows.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity, BookEntity, UserEntity])],
  exports: [TypeOrmModule],
  providers: [BorrowsRepository, BooksRepository, UsersRepository]
})
export class BorrowsModule { }
