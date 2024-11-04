import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { WritersModule } from './writers/writers.module';

@Module({
  imports: [BooksModule, WritersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
