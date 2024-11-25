import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity, BorrowsRepository, BorrowsService } from 'src/borrows';
import { UserEntity, UsersRepository } from 'src/users';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BookEntity, BooksController } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, BorrowEntity, UserEntity])],
  exports: [TypeOrmModule],
  providers: [BooksService, BorrowsService, BooksRepository, BorrowsRepository, UsersRepository],
  controllers: [BooksController],
})

export class BooksModule { }
