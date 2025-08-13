import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrdersDto, OrderItemDto } from './dto/create-order.dto';

@Controller('/api/afisha')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  // POST /api/afisha/order  — принимает массив или объект { items: [...] }
  @Post('order')
  async create(@Body() body: OrderItemDto[] | CreateOrdersDto) {
    const items = Array.isArray(body) ? body : body.items;
    return this.orders.createMany(items);
  }
}