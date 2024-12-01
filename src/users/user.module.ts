import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserService, UsersRepository } from './';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UsersRepository],
  exports: [UserService],
})

export class UserModule { }
