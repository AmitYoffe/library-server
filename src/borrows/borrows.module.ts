import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from './borrow.entity';
import { BorrowsRepository } from './borrows.repository';
import { BorrowsService } from './borrows.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity])],
  providers: [BorrowsService, BorrowsRepository],
  exports: [BorrowsService],
})

export class BorrowsModule { }
