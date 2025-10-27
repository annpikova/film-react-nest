import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

export interface FilmsRepository {
  findAll(): Promise<Film[]>;
  findById(id: string): Promise<Film | null>;
  findByIdWithSchedules(id: string): Promise<Film | null>;
}

export interface SchedulesRepository {
  findById(id: string): Promise<Schedule | null>;
  updateTakenSeats(id: string, takenSeats: string[]): Promise<void>;
}

