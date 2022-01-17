import { Injectable } from '@nestjs/common';
import { Order } from 'src/database/entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

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
  async create(order: Order): Promise<Order> {
    return await this.ordersRepo.save(order);
  }
  async update(order: Order): Promise<UpdateResult> {
    return await this.ordersRepo.update(order.id, order);
  }
  async delete(id: number): Promise<DeleteResult> {
    return await this.ordersRepo.delete(id);
  }
}
