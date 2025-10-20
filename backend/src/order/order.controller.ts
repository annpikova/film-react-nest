import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrdersDto, OrderItemDto } from './dto/create-order.dto';

@Controller('/api/afisha')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  // POST /api/afisha/order  — принимает массив или объект { items: [...] или tickets: [...] }
  @Post('order')
  async create(@Body() body: OrderItemDto[] | CreateOrdersDto | any) {
    let items: OrderItemDto[];

    if (Array.isArray(body)) {
      items = body;
    } else if (body.items) {
      items = body.items;
    } else if (body.tickets) {
      // Convert tickets format to items format
      items = body.tickets.map((ticket: any) => ({
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
      }));
    } else {
      items = [];
    }

    return this.orders.createMany(items);
  }

  // POST /api/afisha/order/ (совместимость с автотестами)
  @Post('order/')
  async createWithSlash(@Body() body: OrderItemDto[] | CreateOrdersDto | any) {
    let items: OrderItemDto[];

    if (Array.isArray(body)) {
      items = body;
    } else if (body.items) {
      items = body.items;
    } else if (body.tickets) {
      // Convert tickets format to items format
      items = body.tickets.map((ticket: any) => ({
        film: ticket.film,
        session: ticket.session,
        row: ticket.row,
        seat: ticket.seat,
      }));
    } else {
      items = [];
    }

    return this.orders.createMany(items);
  }
}
