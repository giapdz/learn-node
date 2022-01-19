import { AppService } from './app.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/payment/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getPaymentById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/payment/create')
  create(@Body(new ValidationPipe()) createItemDto: CreatePaymentDto) {
    return this.appService.createPayment(createItemDto);
  }
  // @Get('orders')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
