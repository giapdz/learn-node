import { EntitySchema } from 'typeorm';
import { Order } from '../entities/order.entity';

export const OrderSchema = new EntitySchema<Order>({
  name: 'Order',
  target: Order,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    userId: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    isBought: {
      type: Boolean,
      default: true,
    },
  },
  relations: {
    product: {
      type: 'many-to-one',
      target: 'Product', // the name of the PhotoSchema
    },
  },
});
