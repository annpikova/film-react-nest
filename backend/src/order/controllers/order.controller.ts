import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, OrderResponseDto } from '../dto/order.dto';

@Controller('api/afisha')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('order')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ items: OrderResponseDto[] }> {
    const results = await this.orderService.createOrder(createOrderDto);
    return { items: results };
  }
}
