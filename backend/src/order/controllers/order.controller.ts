import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto, OrderResponseDto } from '../dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ total: number; items: OrderResponseDto[] }> {
    const results = await this.orderService.createOrder(createOrderDto);
    return {
      total: results.length,
      items: results,
    };
  }
}
