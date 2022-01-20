import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/modules/orders/entities/order.entity';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JwtAuthGuard).forRoutes(OrdersController);
  // }
}
