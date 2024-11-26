import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserService, UsersRepository } from './';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UserService],
  providers: [UserService, UsersRepository],
})

export class UserModule { }
