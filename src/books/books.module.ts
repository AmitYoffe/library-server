import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowsModule } from 'src/borrows/borrows.module';
import { UserModule } from 'src/users';
import { BookEntity } from './book.entity';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    UserModule,
    BorrowsModule
  ],
  providers: [BooksRepository, BooksService],
  controllers: [BooksController],
})

export class BooksModule { }
