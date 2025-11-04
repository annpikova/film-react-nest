import { Injectable } from '@nestjs/common';
import { SchedulesRepository } from './interfaces';
import { Schedule } from '../entities/schedule.entity';
import { DataService } from './data.service';

@Injectable()
export class InMemorySchedulesRepository implements SchedulesRepository {
  constructor(private readonly dataService: DataService) {}

  async findById(id: string): Promise<Schedule | null> {
    return this.dataService.getScheduleById(id);
  }

  async updateTakenSeats(id: string, takenSeats: string[]): Promise<void> {
    this.dataService.updateScheduleTakenSeats(id, takenSeats);
  }
}
