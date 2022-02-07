import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersRepositoryFake } from '../__test/ordersRepositoryFake';
import faker from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
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

  //unit test findOne
  describe('finding a order', () => {
    it('Throws an error when a order doesnt exist', async () => {
      const orderId = faker.datatype.number();
      const orderRepositoryFindOneSpy = jest
        .spyOn(ordersRepository, 'findOne')
        .mockResolvedValue(null);
      expect.assertions(3);
      try {
        await ordersService.findOneByIdOrThrow(orderId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('Order not found.');
      }
      expect(orderRepositoryFindOneSpy).toHaveBeenCalledWith(orderId);
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
      const orderRepositoryFindOneSpy = jest
        .spyOn(ordersRepository, 'findOne')
        .mockResolvedValue(existingOrder);
      const result = await ordersService.findOneByIdOrThrow(orderId);
      expect(result).toBe(existingOrder);
      expect(orderRepositoryFindOneSpy).toHaveBeenCalledWith(orderId);
    });
  });

  //unit test create
  describe('creating a order', () => {
    it('Throws an error when order existed', async () => {
      const orderId = faker.datatype.number();

      const orderRepositoryFindOneSpy = jest
        .spyOn(ordersRepository, 'findOne')
        .mockResolvedValue(null);

      const createOrder: CreateOrderDto = {
        id: orderId,
        userId: faker.datatype.number(),
        productId: faker.datatype.number(),
        quantity: faker.datatype.number(),
        isBought: faker.datatype.boolean(),
      };

      expect.assertions(1);
      try {
        await ordersService.create(createOrder);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe('Order existed');
      }
      expect(orderRepositoryFindOneSpy).toHaveBeenCalledWith(orderId);
    });

    it('Calls the repository with correct paramaters', async () => {
      const orderId = faker.datatype.number();
      const createOrder = {
        id: orderId,
        userId: faker.datatype.number(),
        productId: faker.datatype.number(),
        quantity: faker.datatype.number(),
        isBought: faker.datatype.boolean(),
      };

      const savedOrder = {
        id: orderId,
        userId: faker.datatype.number(),
        product: new Product(),
        quantity: faker.datatype.number(),
        isBought: faker.datatype.boolean(),
      };
      const createOrderEntity: Order = {
        ...createOrder,
        product: new Product(),
      };
      const orderRepositorySaveSpy = jest
        .spyOn(ordersRepository, 'save')
        .mockResolvedValue(savedOrder);
      const orderRepositoryCreateSpy = jest
        .spyOn(ordersRepository, 'create')
        .mockReturnValue(createOrderEntity);

      const result = await ordersService.create(createOrder);

      expect(orderRepositoryCreateSpy).toBeCalledWith(createOrder);
      expect(orderRepositorySaveSpy).toBeCalledWith(createOrderEntity);
      expect(result).toEqual(savedOrder);
    });
  });
  //unit test update
  describe('updating a order', () => {
    it('Calls the repository with correct paramaters', async () => {
      const orderId = faker.datatype.number(),
        quantity = faker.datatype.number(),
        isBought = faker.datatype.boolean();
      const updateOrder: UpdateOrderDto = {
        id: orderId,
        quantity: quantity,
        isBought: isBought,
      };
      const existingOrder = {
        id: orderId,
        userId: faker.datatype.number(),
        product: new Product(),
        quantity: faker.datatype.number(),
        isBought: faker.datatype.boolean(),
      };
      const newOrder = {
        ...existingOrder,
        quantity,
        isBought,
      };
      const savedOrder = { ...newOrder };
      const orderServiceFindOneByIdOrThrowSpy = jest
        .spyOn(ordersService, 'findOneByIdOrThrow')
        .mockResolvedValue(existingOrder);
      const orderRepositoryCreateSpy = jest
        .spyOn(ordersRepository, 'create')
        .mockReturnValue(newOrder);
      const orderRepositorySaveSpy = jest
        .spyOn(ordersRepository, 'save')
        .mockResolvedValue(savedOrder);
      const result = await ordersService.update(updateOrder);

      expect(orderServiceFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
        updateOrder.id,
      );

      expect(orderRepositoryCreateSpy).toHaveBeenCalledWith({
        ...existingOrder,
        quantity,
        isBought,
      });

      expect(orderRepositorySaveSpy).toHaveBeenCalledWith(newOrder);

      expect(result).toEqual(savedOrder);
    });
  });

  // unit test remove
  describe('removing a order', () => {
    it('Calls the repository with correct paramaters', async () => {
      const orderId = faker.datatype.number();
      const existingOrder = {
        id: orderId,
        userId: faker.datatype.number(),
        product: new Product(),
        quantity: faker.datatype.number(),
        isBought: faker.datatype.boolean(),
      };

      const orderRepositoryFindOneByIdOrThrowSpy = jest
        .spyOn(ordersService, 'findOneByIdOrThrow')
        .mockResolvedValue(existingOrder);

      const orderRepositoryRemoveSpy = jest
        .spyOn(ordersRepository, 'remove')
        .mockResolvedValue(null);

      const result = await ordersService.delete(orderId);

      expect(orderRepositoryFindOneByIdOrThrowSpy).toHaveBeenCalledWith(
        orderId,
      );

      expect(orderRepositoryRemoveSpy).toHaveBeenCalledWith(existingOrder);
      expect(result).toBe(null);
    });
  });
});
