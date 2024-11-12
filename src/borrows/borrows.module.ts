import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book, User } from 'src';
import { Borrow, BorrowsService} from './index';

@Module({
  imports: [TypeOrmModule.forFeature([Borrow, Book, User])],
  exports: [TypeOrmModule],
  providers: [BorrowsService]
})
export class BorrowsModule { }
