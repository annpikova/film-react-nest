import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsNotEmpty()
  @IsString()
  film: string;

  @IsNotEmpty()
  @IsString()
  session: string;

  @IsNotEmpty()
  daytime: string;

  @IsNotEmpty()
  row: number;

  @IsNotEmpty()
  seat: number;

  @IsNotEmpty()
  price: number;
}

export class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  film: string;

  @IsNotEmpty()
  @IsString()
  session: string;

  @IsNotEmpty()
  row: number;

  @IsNotEmpty()
  seat: number;
}

export class CreateOrdersDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
