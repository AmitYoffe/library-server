import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowsRepository, BorrowsService } from 'src/borrows';
import { UserEntity, UsersRepository } from 'src/users';
import { WriterEntity, WritersRepository } from 'src/writers';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BookEntity, BooksController } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity, WriterEntity])],
  exports: [TypeOrmModule],
  providers: [
    BooksService,
    BorrowsService,
    BooksRepository,
    BorrowsRepository,
    UsersRepository,
    WritersRepository
  ],
  controllers: [BooksController],
})

export class BooksModule { }
