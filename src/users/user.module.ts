import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowEntity } from 'src/borrows/borrow.entity';
import { UserEntity, UserService } from './';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BorrowEntity])],
  exports: [UserService],
  providers: [UserService],
})

export class UserModule { }
