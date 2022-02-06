import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  // get all order
  @Get()
  async findAll(@Res() res: Response) {
    const orders = await this.ordersService.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Success',
      orders,
    });
  }

  // get order by id
  @Get(':id')
  async get(@Res() res: Response, @Param('id', ParseIntPipe) id) {
    const order = await this.ordersService.findOneByIdOrThrow(id);
    res.status(HttpStatus.OK).json({
      message: 'Success',
      order,
    });
  }

  // create a order
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Res() res: Response,
    @Body(new ValidationPipe()) createOrder: CreateOrderDto,
  ) {
    const order = await this.ordersService.create(createOrder);
    res.status(HttpStatus.OK).json({
      message: 'Order has been created successfully',
      order,
    });
  }

  // update a order
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Res() res: Response,
    @Body(new ValidationPipe()) updateOrder: UpdateOrderDto,
  ) {
    const order = await this.ordersService.update(updateOrder);
    res.status(HttpStatus.OK).json({
      message: 'Order has been updated successfully',
      order,
    });
  }

  // delete a order
  @UseGuards(JwtAuthGuard)
  @Delete()
  async delete(@Res() res: Response, @Query('id', ParseIntPipe) id) {
    res.status(HttpStatus.OK).json({
      message: 'Order has been deleted successfully',
    });
  }
}
