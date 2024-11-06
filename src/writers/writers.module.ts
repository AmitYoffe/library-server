import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writer } from './writer.entity';
import { WritersController } from './writers.controller';
import { WritersService } from './writers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Writer])],
  exports: [TypeOrmModule],
  controllers: [WritersController],
  providers: [WritersService]
})
export class WritersModule { }
