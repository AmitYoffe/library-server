import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowsRepository, BorrowsService } from 'src/borrows';
import { UserEntity, UsersRepository } from 'src/users';
import { WriterEntity, WritersRepository } from 'src/writers';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BookEntity, BooksController } from './';
import { LoggerMiddleware } from 'src/middleware';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity, WriterEntity])],
  exports: [TypeOrmModule], // unnecessary 
  providers: [
    BooksService,
    BorrowsService,
    BooksRepository,
    BorrowsRepository,
    UsersRepository,
    WritersRepository,
    LoggerMiddleware,
    Logger
  ],
  controllers: [BooksController],
})

export class BooksModule { }
