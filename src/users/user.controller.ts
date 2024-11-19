import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get('login/:userId')
    findOne(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.findOne(userId);
    }

    @Post('register')
    register(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.register(user);
    }
}

// Todo: I should add a permission check for EVERY request throughout the project,
// need to check if a user is even logged in and apply logic accordingly.
