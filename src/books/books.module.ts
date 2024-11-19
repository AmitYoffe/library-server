import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity, BorrowsService } from 'src/borrows';
import { BookEntity, BooksController, BooksService } from './';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, BorrowEntity])],
  exports: [TypeOrmModule],
  providers: [BooksService, BorrowsService],
  controllers: [BooksController]
})
export class BooksModule { }
