import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/borrows/borrow.entity';
import { User, UserController, UserService } from './index';

@Module({
  imports: [TypeOrmModule.forFeature([User, Borrow])],
  exports: [TypeOrmModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
