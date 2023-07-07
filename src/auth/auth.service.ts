import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  async login(userDto: CreateUserDto) {
    const user = await this.validateService(userDto); // TODO return correct data

    // return this.generateToken(user);
    return '';
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {};
  }

  private async validateService(userDto: CreateUserDto) {
    return '';
  }
}
