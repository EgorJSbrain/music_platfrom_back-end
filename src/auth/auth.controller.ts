import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  me(@Request() req) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    return this.authService.me(token);
  }
}
