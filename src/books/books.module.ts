import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity, BorrowsService } from 'src/borrows';
import { UserEntity } from 'src/users';
import { BooksService } from './books.service';
import { BookEntity, BooksController } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, BorrowEntity, UserEntity])],
  exports: [TypeOrmModule],
  providers: [BooksService, BorrowsService],
  controllers: [BooksController]
})
export class BooksModule { }
