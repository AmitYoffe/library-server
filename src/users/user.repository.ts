import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { UserEntity, CreateUserDto } from "./";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    // do not use query builder here - Rony claims i can do it one line
    async findOne(username: string) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        queryBuilder.where('user.username = :username', { username });

        const user = await queryBuilder.getOne();
        if (!user) throw new NotFoundException(`User with username ${username} not found`);

        return user;
    }

    async findMany(userIds: number[]) {
        this.userRepository.find({
            where: { id: In(userIds) },
            select: ['id', 'username', 'borrows']
        })
        // Don't see the borrows field - maybe make some query to show it
    }

    async register(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto)
        return await this.userRepository.save(user)
    }
}