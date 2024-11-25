import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateUserDto, UserEntity } from "./";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async findOne(username: string) {
        const user = this.userRepository.findOne({ where: { username } })
        if (!user) throw new NotFoundException(`User with username ${username} not found`);

        return user;
    }

    async findMany(userIds: number[]) {
        const users = this.userRepository.find({
            where: { id: In(userIds) },
            select: ['id', 'username', 'borrows']
        })
        // Don't see the borrows field - maybe make some query to show it
        return users
    }

    async register(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto)
        return await this.userRepository.save(user)
    }
}