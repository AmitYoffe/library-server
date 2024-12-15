import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user)
      throw new NotFoundException(`User with username ${username} not found`);

    return user;
  }

  findOneById(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  findManyByIds(userIds: number[]) {
    return this.userRepository.find({
      where: { id: In(userIds) },
      select: ['id', 'username'],
      relations: ['borrows'],
    });
  }

  async register(userDto: CreateUserDto) {
    const username = userDto.username;
    const existingUserWithUsername = await this.userRepository.findOne({ where: { username } });

    if (existingUserWithUsername) {
      throw new NotFoundException(`User with name "${username}" already exists, try another name.`)
    }

    const user = this.userRepository.create(userDto);
    this.userRepository.save(user);
  }
}
