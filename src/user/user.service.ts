import { Injectable, HttpException, HttpService, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './models/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { RegisterUserDto } from './dtos/registerUser.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.modelName) private readonly user: Model<User>) {}

  findOne(filter = {}): Promise<User> {
    return this.user.findOne(filter).exec();
  }
  create(item) {
    return this.user.create(item);
  }

  async register(dto: RegisterUserDto) {
    const { username, password } = dto;
    const newUser = User.createModel();
    newUser.username = username.trim();
    newUser.password = password.trim();

    try {
      const result = await this.create(newUser);
      return result.toJSON() as User;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
