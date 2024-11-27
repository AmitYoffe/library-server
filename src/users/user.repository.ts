import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateUserDto, UserEntity } from "./";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    findOne(username: string) {
        const user = this.userRepository.findOne({ where: { username } })
        if (!user) throw new NotFoundException(`User with username ${username} not found`);

        return user;
    }

    findOneById(id: number) {
        const user = this.userRepository.findOne({ where: { id } })
        if (!user) throw new NotFoundException(`User with id ${id} not found`);

        return user;
    }

    findMany(userIds: number[]) {
        const users = this.userRepository.find({
            where: { id: In(userIds) },
            select: ['id', 'username'],
            relations: ['borrows'],
        })

        return users
    }

    register(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto)
        return this.userRepository.save(user)
    }
}