import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity, BorrowsRepository, BorrowsService } from 'src/borrows';
import { LoggerMiddleware } from 'src/middleware';
import { UserEntity, UsersRepository } from 'src/users';
import { WriterEntity, WritersRepository } from 'src/writers';
import { BookEntity, BooksController } from './';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, UserEntity, WriterEntity, BorrowEntity])],
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
