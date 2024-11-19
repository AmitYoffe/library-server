import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, UserEntity } from 'src';
import { BorrowEntity } from './borrow.entity';
import { BorrowsService } from './borrows.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity, BookEntity, UserEntity])],
  exports: [TypeOrmModule],
  providers: [BorrowsService]
})
export class BorrowsModule { }
