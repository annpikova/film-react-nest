import { Injectable, BadRequestException } from '@nestjs/common';
import { AppRepository } from '../../repositories/app.repository';
import { CreateOrderDto, OrderResponseDto } from '../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly appRepository: AppRepository) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { filmId, scheduleId, seats } = createOrderDto;

    // Проверяем существование сеанса
    const schedule = await this.appRepository.schedules.findById(scheduleId);
    if (!schedule) {
      throw new BadRequestException('Schedule not found');
    }

    // Проверяем, что сеанс принадлежит указанному фильму
    if (schedule.filmId !== filmId) {
      throw new BadRequestException(
        'Schedule does not belong to the specified film',
      );
    }

    // Проверяем доступность мест
    const takenSeats = schedule.taken
      ? schedule.taken.split(',').filter((seat: string) => seat.trim() !== '')
      : [];
    const conflictingSeats = seats.filter((seat) => takenSeats.includes(seat));
    if (conflictingSeats.length > 0) {
      throw new BadRequestException(
        `Seats ${conflictingSeats.join(', ')} are already taken`,
      );
    }

    // Обновляем занятые места
    const updatedTakenSeats = [...takenSeats, ...seats];
    await this.appRepository.schedules.updateTakenSeats(
      scheduleId,
      updatedTakenSeats,
    );

    // Возвращаем информацию о заказе
    return {
      id: `order_${Date.now()}`, // В реальном приложении это должен быть UUID
      filmId,
      scheduleId,
      seats,
      createdAt: new Date(),
    };
  }
}
