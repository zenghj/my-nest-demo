import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dtos/registerUser.dto'
import { User } from './models/user.model'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<User> {
    // TODO 拆分校验逻辑
    const { username, password, inviteCode } = dto;
    if (inviteCode !== '2333') {
      throw new HttpException('invalid inviteCode', HttpStatus.BAD_REQUEST);
    }

    if (!username) {
      throw new HttpException('username is required!', HttpStatus.BAD_REQUEST);
    }

    if (!password) {
      throw new HttpException('password is required!', HttpStatus.BAD_REQUEST);
    }

    let exist;

    try {
      exist = await this.userService.findOne({username});
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      throw new HttpException(`${username} already exists!`, HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.userService.register(dto);
    return newUser;
    // TODO 完善map
    // console.log(newUser);
    // return this.userService.map(dto, User, )

  }
}
