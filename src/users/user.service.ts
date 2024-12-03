import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UsersRepository,
    ) { }

    async findOne(username: string) {
        return await this.userRepository.findOneByUsername(username)
    }

    findOneById(id: number) {
        return this.userRepository.findOneById(id)
    }

    findMany(userIds: number[]) {
        return this.userRepository.findMany(userIds)
    }

    register(userDto: CreateUserDto) {
        this.userRepository.register(userDto)
    }
}
