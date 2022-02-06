import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersRepositoryFake } from './ordersRepositoryFake';
import faker from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useClass: OrdersRepositoryFake,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get(getRepositoryToken(Order));
  });
  describe('finding a order', () => {
    it('Throws an error when a order doesnt exist', async () => {
      const orderId = faker.datatype.number();
      const orderRepostoryFindOneSpy = jest
        .spyOn(ordersRepository, 'findOne')
        .mockResolvedValue(null);
      expect.assertions(3);
      try {
        await ordersService.findOneByIdOrThrow(orderId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Order not found.');
      }
      expect(orderRepostoryFindOneSpy).toHaveBeenCalledWith(orderId);
    });
    it('return the found order', async () => {
      const orderId = faker.datatype.number();
      const existingOrder = {
        id: orderId,
        userId: faker.datatype.number(),
        product: new Product(),
        quantity: faker.datatype.number(),
        isBought: faker.datatype.boolean(),
      };
      const orderRepostoryFindOneSpy = jest
        .spyOn(ordersRepository, 'findOne')
        .mockResolvedValue(existingOrder);
      const result = await ordersService.findOneByIdOrThrow(orderId);
      expect(result).toBe(existingOrder);
      expect(orderRepostoryFindOneSpy).toHaveBeenCalledWith(orderId);
    });
  });
});
