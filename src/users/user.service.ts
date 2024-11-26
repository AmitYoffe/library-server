import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UsersRepository,
    ) { }

    async findOne(username: string) {
        return await this.userRepository.findOne(username)
    }

    async register(userDto: CreateUserDto) {
        return await this.userRepository.register(userDto)
    }
}
