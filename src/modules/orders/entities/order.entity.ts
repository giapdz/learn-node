import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  quantity: number;

  @Column({ default: true })
  isBought: boolean;

  @ManyToOne((type) => Product, (product) => product.orders)
  product: Product;
}
