import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { Order } from '../../modules/orders/entities/order.entity';
import { Product } from '../../modules/orders/entities/product.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Order, Product],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
