import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ITEM_MICROSERVICE') private readonly client: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World! ';
  }
  createPayment(createPaymentDto) {
    console.log(createPaymentDto);
    return this.client.send(
      { role: 'payment', cmd: 'create' },
      createPaymentDto,
    );
  }
  getPaymentById(id: number) {
    return this.client.send({ role: 'payment', cmd: 'get-by-id' }, id);
  }
}
