import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, UserService } from 'src/users';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('login')
    logIn(@Body() authPayloadDto: AuthPayloadDto) {
        return this.authService.logIn(authPayloadDto.username, authPayloadDto.password);
    }

    @Post('register')
    register(@Body() userDto: CreateUserDto) {
        return this.authService.register(userDto);
    }
}
