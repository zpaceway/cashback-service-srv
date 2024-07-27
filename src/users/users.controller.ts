import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserLoginFormDto } from 'src/dto';
import { UsersService } from './users.service';
import { Request } from 'express';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/auth/login')
  login(@Body() userLoginForm: UserLoginFormDto) {
    return this.usersService.login(userLoginForm);
  }

  @Post('/auth/logout')
  async logout(@Req() req: Request) {
    const user = await this.usersService.getUserFromRequest(req);
    return this.usersService.logout(user);
  }

  @Post('/auth/refresh')
  async refresh(@Body() tokenPayload: { refreshToken: string }) {
    return this.usersService.getNewAccessTokenFromRefreshToken(
      tokenPayload.refreshToken,
    );
  }

  @Get('cashback')
  async getCashback(@Req() req: Request) {
    const user = await this.usersService.getUserFromRequest(req);
    return this.usersService.getCashback(user);
  }
}
