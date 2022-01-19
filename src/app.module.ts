import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { DatabaseModule } from './database/database.module';
import { OrdersModule } from './orders/orders.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    OrdersModule,
    AuthModule,
    ClientsModule.register([
      {
        name: 'ITEM_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
