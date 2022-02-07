import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateOrderDto {
  @IsInt() id: number;

  @IsInt() quantity: number;

  @IsBoolean() isBought: boolean;
}
