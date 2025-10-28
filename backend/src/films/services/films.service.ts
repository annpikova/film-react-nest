import { Injectable } from '@nestjs/common';
import { AppRepository } from '../../repositories/app.repository';
import { FilmResponseDto, ScheduleResponseDto } from '../dto/films.dto';
import { Film, Schedule } from '../../entities';

@Injectable()
export class FilmsService {
  constructor(private readonly appRepository: AppRepository) {}

  async findAll(): Promise<{ total: number; items: FilmResponseDto[] }> {
    const films = await this.appRepository.films.findAll();
    const filmDtos = films.map((film) => this.mapFilmToDto(film));
    return {
      total: filmDtos.length,
      items: filmDtos,
    };
  }

  async findByIdWithSchedules(id: string): Promise<FilmResponseDto | null> {
    const film = await this.appRepository.films.findByIdWithSchedules(id);
    if (!film) {
      return null;
    }
    return this.mapFilmToDto(film);
  }

  private mapFilmToDto(film: Film): FilmResponseDto {
    return {
      id: film.id,
      title: film.title,
      about: film.about,
      description: film.description,
      director: film.director,
      rating: parseFloat(film.rating.toString()),
      image: film.image,
      cover: film.cover,
      tags: film.tags,
      schedule: film.schedules?.map((schedule: Schedule) =>
        this.mapScheduleToDto(schedule),
      ),
    };
  }

  private mapScheduleToDto(schedule: Schedule): ScheduleResponseDto {
    return {
      id: schedule.id,
      daytime: schedule.daytime.toISOString(),
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken
        ? schedule.taken.split(',').filter((seat: string) => seat.trim() !== '')
        : [],
      film: schedule.filmId, // Добавляем filmId как film
    };
  }
}
