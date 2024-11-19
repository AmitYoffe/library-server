import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WriterEntity, WritersController, WritersService } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([WriterEntity])],
  exports: [TypeOrmModule],
  controllers: [WritersController],
  providers: [WritersService]
})
export class WritersModule { }
