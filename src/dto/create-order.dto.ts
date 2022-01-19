import { IsBoolean, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsInt() id: number;

  @IsInt() userId: number;

  @IsInt() productId: number;

  @IsInt() quantity: number;

  @IsBoolean() isBought: boolean;
}
