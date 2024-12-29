import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthPayloadDto, IsAdmin, Public } from 'src/auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/user.service';
import { UserAdminGuard } from './userAdmin.guard';

@Controller('user')
@UseGuards(UserAdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @IsAdmin()
  findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  @Public()
  async logIn(@Body() { username, password }: AuthPayloadDto) {
    const user = await this.userService.findOne(username);

    return this.userService.logIn(user, password);
  }

  @Post('register')
  @Public()
  register(@Body() userDto: CreateUserDto) {
    return this.userService.register(userDto);
  }
}
