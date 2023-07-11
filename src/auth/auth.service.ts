import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateService(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException('User with this email is existed', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  async me(token: string) {
    const userDecodedData = this.jwtService.decode(token);
    const email = typeof userDecodedData !== 'string' && userDecodedData.email;
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User with this email is existed', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return { token: this.jwtService.sign(payload) };
  }

  private async validateService(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({ message: "User with this email doesn't exist" });
    }

    const isPsswordsEqual = await bcrypt.compare(userDto.password, user.password);

    if (user && isPsswordsEqual) {
      return user;
    }

    throw new UnauthorizedException({ message: "Password isn't correct" });
  }
}
