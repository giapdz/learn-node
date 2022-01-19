import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsInt({ message: 'id must be numberic' }) id: number;
  @IsString({ always: false }) name: string;
  @IsBoolean() isPay: boolean;
}
