export class CreateOrderDto {
  filmId: string;
  scheduleId: string;
  seats: string[];
}

export class OrderResponseDto {
  id: string;
  filmId: string;
  scheduleId: string;
  seats: string[];
  createdAt: Date;
}
