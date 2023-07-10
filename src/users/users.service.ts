import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModael: Model<User>) {}

  async create(dto: CreateUserDto) {
    const user = this.userModael.create(dto);

    return user;
  }

  async getUserByEmail(email: string) {
    const existedUser = await this.userModael.findOne({ email: email });

    return existedUser;
  }
}
