import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UsersRepository,
    ) { }

    async findOne(username: string) {
        return await this.userRepository.findOneByUsername(username)
    }

    findOneById(id: number) {
        return this.userRepository.findOneById(id)
    }

    findManyByIds(userIds: number[]) {
        return this.userRepository.findManyByIds(userIds)
    }

    logIn(user: UserEntity, pass: string) {
        this.authService.logIn(user, pass)
    }

    register(userDto: CreateUserDto) {
        this.userRepository.register(userDto)
    }
}
