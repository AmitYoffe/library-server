import { Body, Controller, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('login')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) user: CreateUserDto) {
        return this.userService.create(user);
    }
}

// Naming is problematic, create should be register
// I should add a permission check for EVERY request,
// need to check if a user is even logged in.

// Todo: I should have a log in route and a user registration route ( Backend only )