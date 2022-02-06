import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSchema } from './schemas/order.schema';

@Module({
  imports: [TypeOrmModule.forFeature([OrderSchema])],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(JwtAuthGuard).forRoutes(OrdersController);
  // }
}
