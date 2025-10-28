export class TicketDto {
  film: string;
  session: string;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrderDto {
  email: string;
  phone: string;
  tickets: TicketDto[];
}

export class OrderResponseDto {
  id: string;
  film: string;
  session: string;
  row: number;
  seat: number;
  price: number;
  daytime: Date;
}
