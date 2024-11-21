import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, UserService } from 'src/users';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Post('login')
    logIn(@Body() authPayloadDto: AuthPayloadDto) {
        return this.authService.logIn(authPayloadDto.username, authPayloadDto.password);
    }

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.userService.register(userDto);
    }
}
