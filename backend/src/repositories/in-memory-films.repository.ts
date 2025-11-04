import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './interfaces';
import { Film } from '../entities/film.entity';
import { DataService } from './data.service';

@Injectable()
export class InMemoryFilmsRepository implements FilmsRepository {
  constructor(private readonly dataService: DataService) {}

  async findAll(): Promise<Film[]> {
    return this.dataService.getFilms();
  }

  async findById(id: string): Promise<Film | null> {
    const films = this.dataService.getFilms();
    return films.find((film) => film.id === id) || null;
  }

  async findByIdWithSchedules(id: string): Promise<Film | null> {
    const films = this.dataService.getFilms();
    return films.find((film) => film.id === id) || null;
  }
}
