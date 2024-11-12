import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, User } from 'src';
import { Borrow } from './borrow.entity';
import { BorrowsService } from './borrows.service';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book, User])],
  exports: [TypeOrmModule],
  providers: [BorrowsService]
})
export class BorrowsModule { }
