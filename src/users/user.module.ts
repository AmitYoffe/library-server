import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UsersRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  providers: [UserService, UsersRepository],
  exports: [UserService],
  controllers: [UserController]
})

export class UserModule { }
