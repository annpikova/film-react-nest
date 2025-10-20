import { ConflictException, Injectable } from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import { OrderItemDto } from './dto/create-order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(private readonly films: FilmsService) {}

  private key(row: number, seat: number) {
    return `${row}:${seat}`;
  }

  async createMany(items: OrderItemDto[]) {
    if (!items || items.length === 0) return { total: 0, items: [] };

    // Группируем по (film, session) → резервируем пачками (атомарно на сеанс)
    const groups = new Map<
      string,
      { film: string; session: string; seats: string[] }
    >();
    for (const it of items) {
      const gk = `${it.film}::${it.session}`;
      const entry = groups.get(gk) ?? {
        film: it.film,
        session: it.session,
        seats: [],
      };
      entry.seats.push(this.key(it.row, it.seat));
      groups.set(gk, entry);
    }

    // Try to reserve all seats first
    for (const g of groups.values()) {
      const ok = await this.films.tryReserve(g.film, g.session, g.seats);
      if (!ok) {
        throw new ConflictException('Some of selected seats are already taken');
      }
    }

    // Get session data for each item to return proper ticket information
    const result = [];
    for (const item of items) {
      try {
        const sessionData = await this.films.getSessionData(
          item.film,
          item.session,
        );
        result.push({
          id: randomUUID(),
          film: item.film,
          session: item.session,
          daytime: sessionData.daytime,
          row: item.row,
          seat: item.seat,
          price: sessionData.price,
        });
      } catch (error) {
        console.error('Error getting session data:', error);
        throw new ConflictException('Session not found');
      }
    }

    return { total: result.length, items: result };
  }
}
