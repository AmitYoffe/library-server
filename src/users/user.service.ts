import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UsersRepository,
        private readonly jwtService: JwtService,
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
        return this.authService.logIn(user, pass)
    }

    register(userDto: CreateUserDto) {
        this.userRepository.register(userDto)
    }

    getUserFromRequestToken(request: Request) {
        const token = this.authService.extractTokenFromHeader(request.headers);
        if (!token) return null;

        try {
            const decodedUser = this.jwtService.decode(token);
            return decodedUser;
        } catch {
            return null;
        }
    }
}
