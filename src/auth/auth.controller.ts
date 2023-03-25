import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersDto } from './dto/user.register.dto';
import { UsersSigninDto } from './dto/user.signin.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() usersDto: UsersDto): Promise<object> {
    return this.authService.signUp(usersDto);
  }

  @Post('/signin')
  signIn(
    @Body() usersSigninDto: UsersSigninDto,
    @Req() req: Request,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(usersSigninDto, req);
  }
}
