import {
  Get,
  Post,
  Controller,
  Query,
  UseGuards,
  Param,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Get()
  @UseGuards(LocalAuthGuard)
  findAll(@Req() request) {
    console.log('request');
    return request.user;
  }
}
