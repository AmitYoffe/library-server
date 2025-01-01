import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto, Public } from 'src/auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/user.service';
import { UserAdminGuard } from './userAdmin.guard';

@Public()
@Controller('user')
@UseGuards(UserAdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('jwt')
  getUserFromJwt(@Req() request: Request) {
    return this.userService.getUserFromJwt(request);
  }

  @Post('login')
  async logIn(@Body() { username, password }: AuthPayloadDto) {
    const user = await this.userService.findOne(username);

    return this.userService.logIn(user, password);
  }

  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.userService.register(userDto);
  }
}
