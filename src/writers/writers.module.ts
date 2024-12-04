import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterEntity } from './writer.entity';
import { WritersController } from './writers.controller';
import { WritersRepository } from './writers.repository';
import { WritersService } from './writers.service';

@Module({
  imports: [TypeOrmModule.forFeature([WriterEntity])],
  controllers: [WritersController],
  providers: [WritersService, WritersRepository]
})

export class WritersModule { }
