import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto, Public } from 'src/auth';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/user.service';

@Public()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
