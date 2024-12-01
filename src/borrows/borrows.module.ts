import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/users';
import { BorrowEntity } from './borrow.entity';
import { BorrowsRepository } from './borrows.repository';
import { BorrowsService } from './borrows.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BorrowEntity]),
    LoggerModule,
    UserModule,
    BooksModule,
  ],
  providers: [
    BorrowsRepository,
    BorrowsService,
  ],
  exports: [BorrowsService]
})

export class BorrowsModule { }
