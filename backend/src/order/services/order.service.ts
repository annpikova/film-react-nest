import { Injectable, BadRequestException } from '@nestjs/common';
import { AppRepository } from '../../repositories/app.repository';
import { CreateOrderDto, OrderResponseDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly appRepository: AppRepository) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto[]> {
    const { email, phone, tickets } = createOrderDto;

    // сюда можно будет прикрутить сохранение контактов
    console.log(`Order for ${email}, phone: ${phone}`);

    const results: OrderResponseDto[] = [];
    // Копим обновления по занятым местам для каждого сеанса
    const updates = new Map<string, string[]>();

    for (const ticket of tickets) {
      // находим сеанс
      const schedule = await this.appRepository.schedules.findById(
        ticket.session,
      );

      if (!schedule) {
        throw new BadRequestException(`Session ${ticket.session} not found`);
      }

      // текущее состояние занятых сидений
      const initialTaken = schedule.taken
        ? schedule.taken.split(',').filter((p) => p.trim() !== '')
        : [];

      const seatKey = `${ticket.row}-${ticket.seat}`;

      // берём "рабочую" копию для этого сеанса
      let takenForSchedule = updates.get(schedule.id);
      if (!takenForSchedule) {
        takenForSchedule = [...initialTaken];
        updates.set(schedule.id, takenForSchedule);
      }

      // проверяем, не занято ли место уже (в том числе внутри этого же заказа)
      if (takenForSchedule.includes(seatKey)) {
        throw new BadRequestException(
          `Seat ${seatKey} is already taken for session ${ticket.session}`,
        );
      }

      // помечаем как занято
      takenForSchedule.push(seatKey);

      // формируем билет
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

    // фиксируем обновлённые занятые места
    for (const [scheduleId, takenArr] of updates.entries()) {
      await this.appRepository.schedules.updateTakenSeats(scheduleId, takenArr);
    }

    return results;
  }
}
