export class ScheduleItemDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmWithScheduleDto {
  total: number;
  items: ScheduleItemDto[];
}
