import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/typeorm.config';
import { WritersModule } from './writers/writers.module';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [BooksModule, WritersModule, TypeOrmModule.forRoot(typeOrmConfig), BorrowsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}