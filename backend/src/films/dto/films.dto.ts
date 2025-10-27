export class FilmResponseDto {
  id: string;
  title: string;
  about: string;
  description: string;
  director: string;
  rating: number;
  image: string;
  cover: string;
  tags: string[];
  schedule?: ScheduleResponseDto[];
}

export class ScheduleResponseDto {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
  film: string; // Добавляем поле film
}
