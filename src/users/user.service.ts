import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findOne(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException(`User With Id of ${id} Not Found`);

        return user;
    }

    async create(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto)
        return await this.userRepository.save(user)
    }
}
