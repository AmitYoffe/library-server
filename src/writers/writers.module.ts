import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterEntity, WritersController } from './index';
import { WritersRepository } from './writers.repository';
import { WritersService } from './writers.service';

@Module({
  imports: [TypeOrmModule.forFeature([WriterEntity])],
  exports: [TypeOrmModule],
  controllers: [WritersController],
  providers: [WritersService, WritersRepository]
})

export class WritersModule { }
