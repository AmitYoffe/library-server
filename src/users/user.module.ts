import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from 'src/borrows/borrow.entity';
import { UserEntity, UserController, UserService } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BorrowEntity])],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
