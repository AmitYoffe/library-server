import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writer, WritersController, WritersService } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([Writer])],
  exports: [TypeOrmModule],
  controllers: [WritersController],
  providers: [WritersService]
})
export class WritersModule { }
