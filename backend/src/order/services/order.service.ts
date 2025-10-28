import { Injectable, BadRequestException } from '@nestjs/common';
import { AppRepository } from '../../repositories/app.repository';
import { CreateOrderDto, OrderResponseDto, TicketDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly appRepository: AppRepository) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto[]> {
    const { email, phone, tickets } = createOrderDto;

    // В будущем здесь можно добавить логику сохранения контактных данных
    console.log(`Order for ${email}, phone: ${phone}`);

    // Группируем билеты по сеансам
    const ticketsBySession = new Map<string, TicketDto[]>();
    for (const ticket of tickets) {
      if (!ticketsBySession.has(ticket.session)) {
        ticketsBySession.set(ticket.session, []);
      }
      ticketsBySession.get(ticket.session)!.push(ticket);
    }

    const results: OrderResponseDto[] = [];

    // Обрабатываем каждый сеанс
    for (const [sessionId, sessionTickets] of ticketsBySession) {
      // Проверяем существование сеанса
      const schedule = await this.appRepository.schedules.findById(sessionId);
      if (!schedule) {
        throw new BadRequestException(`Schedule ${sessionId} not found`);
      }

      // Проверяем доступность мест
      const takenSeats = schedule.taken
        ? schedule.taken.split(',').filter((seat: string) => seat.trim() !== '')
        : [];

      const seatsToBook = sessionTickets.map(
        (ticket) => `${ticket.row}:${ticket.seat}`,
      );
      const conflictingSeats = seatsToBook.filter((seat) =>
        takenSeats.includes(seat),
      );

      if (conflictingSeats.length > 0) {
        throw new BadRequestException(
          `Seats ${conflictingSeats.join(', ')} are already taken`,
        );
      }

      // Обновляем занятые места
      const updatedTakenSeats = [...takenSeats, ...seatsToBook];
      await this.appRepository.schedules.updateTakenSeats(
        sessionId,
        updatedTakenSeats,
      );

      // Добавляем результаты для каждого билета
      for (const ticket of sessionTickets) {
        results.push({
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          film: ticket.film,
          session: ticket.session,
          row: ticket.row,
          seat: ticket.seat,
          price: ticket.price,
          daytime: schedule.daytime,
        });
      }
    }

    return results;
  }
}
