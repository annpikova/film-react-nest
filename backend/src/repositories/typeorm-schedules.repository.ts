import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { SchedulesRepository } from './interfaces';

@Injectable()
export class TypeOrmSchedulesRepository implements SchedulesRepository {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findById(id: string): Promise<Schedule | null> {
    return this.scheduleRepository.findOne({
      where: { id },
      relations: ['film'],
    });
  }

  async updateTakenSeats(id: string, takenSeats: string[]): Promise<void> {
    const takenString = takenSeats.join(',');
    await this.scheduleRepository.update(id, { taken: takenString });
  }
}
