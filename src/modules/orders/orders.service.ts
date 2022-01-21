import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepo: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.ordersRepo.find();
  }
  async findOne(id: number): Promise<Order> {
    return await this.ordersRepo.findOne(id);
  }
  async create(order: CreateOrderDto): Promise<Order> {
    return await this.ordersRepo.save(order);
  }
  async update(order: UpdateOrderDto): Promise<number> {
    const orderUpdate = await this.ordersRepo.update(order.id, order);
    return orderUpdate.affected;
  }
  async delete(id: number): Promise<number> {
    const order = await this.ordersRepo.delete(id);
    return order.affected;
  }
}
