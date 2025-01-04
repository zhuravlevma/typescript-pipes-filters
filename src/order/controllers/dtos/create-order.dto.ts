import {
  IsString,
  IsArray,
  IsNumber,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsString()
  productId: string;

  @IsPositive()
  @IsNumber()
  quantity: number;

  @IsPositive()
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  orderId: string;

  @IsString()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsPositive()
  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;
}
