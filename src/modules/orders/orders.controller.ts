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
  ValidationPipe,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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
  create(@Body(new ValidationPipe()) order: CreateOrderDto) {
    return this.ordersService.create(order);
  }

  // update a order
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body(new ValidationPipe()) order: UpdateOrderDto) {
    return this.ordersService.update(order);
  }

  // delete a order
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param(ParseIntPipe) params) {
    return this.ordersService.delete(params.id);
  }
}
