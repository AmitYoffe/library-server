import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UserEntity } from './';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findOne(username: string) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        queryBuilder.where('user.username = :username', { username });

        const user = await queryBuilder.getOne();
        if (!user) throw new NotFoundException(`User with username ${username} not found`);

        return user;
    }

    async register(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto)
        return await this.userRepository.save(user)
    }
}
