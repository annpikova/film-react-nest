export class OrderResultDto {
  total: number;
  items: Array<{
    id: string;
    film: string;
    session: string;
    daytime: string;
    row: number;
    seat: number;
    price: number;
  }>;
}
