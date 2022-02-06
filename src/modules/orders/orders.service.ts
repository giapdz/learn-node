import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  async findOneByIdOrThrow(id: number): Promise<Order> {
    const order = await this.ordersRepo.findOne(id);
    if (!order) throw new NotFoundException('Order not found.');
    return order;
  }
  async create(order: CreateOrderDto): Promise<Order> {
    const createOrder = await this.ordersRepo.findOne(order.id);

    if (createOrder) {
      throw new BadRequestException('Order existed');
    }
    const createdOrder = await this.ordersRepo.create(order);
    return await this.ordersRepo.save(createdOrder);
  }
  async update(order: UpdateOrderDto): Promise<Order> {
    const { id, ...updateData } = order;
    const existOrder = await this.findOneByIdOrThrow(id);
    const ordered = await this.ordersRepo.create({
      ...existOrder,
      ...updateData,
    });
    return await this.ordersRepo.save(ordered);
  }
  async delete(id: number): Promise<Order> {
    const order = await this.findOneByIdOrThrow(id);
    await this.ordersRepo.remove(order);
    return null;
  }
}
