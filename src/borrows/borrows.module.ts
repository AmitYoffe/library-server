import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity, UserEntity } from 'src';
import { BorrowsService } from './borrows.service';
import { BorrowEntity } from './borrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity, BookEntity, UserEntity])],
  exports: [TypeOrmModule],
  providers: [BorrowsService]
})
export class BorrowsModule { }
