import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Order } from 'src/database/entity/order.entity';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  // get all order
  @Get()
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  // get order by id
  @Get(':id')
  get(@Param(ParseIntPipe) params) {
    return this.ordersService.findOne(params.id);
  }

  // create a order
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() order: Order) {
    return this.ordersService.create(order);
  }

  // update a order
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() order: Order) {
    return this.ordersService.update(order);
  }

  // delete a order
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param(ParseIntPipe) params) {
    return this.ordersService.delete(params.id);
  }
}
