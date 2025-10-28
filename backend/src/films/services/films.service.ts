import { Injectable } from '@nestjs/common';
import { AppRepository } from '../../repositories/app.repository';
import { FilmResponseDto, ScheduleResponseDto } from '../dto/films.dto';
import { Film, Schedule } from '../../entities';

@Injectable()
export class FilmsService {
  constructor(private readonly appRepository: AppRepository) {}

  // GET /api/afisha/films/
  async findAll(): Promise<{ total: number; items: FilmResponseDto[] }> {
    const films = await this.appRepository.films.findAll();
    const filmDtos = films.map((film) => this.mapFilmToDto(film));

    return {
      total: filmDtos.length,
      items: filmDtos,
    };
  }

  // GET /api/afisha/films/:id/schedule/
  // Возвращает массив сеансов конкретного фильма
  async findByIdWithSchedules(
    id: string,
  ): Promise<{ schedule: ScheduleResponseDto[] } | null> {
    const film = await this.appRepository.films.findByIdWithSchedules(id);
    if (!film) {
      return null;
    }

    const scheduleDtos = (film.schedules || []).map((s) =>
      this.mapScheduleToDto(s),
    );

    return {
      schedule: scheduleDtos,
    };
  }

  // Маппим фильм -> DTO
  private mapFilmToDto(film: Film): FilmResponseDto {
    return {
      id: film.id,
      title: film.title,
      about: film.about,
      description: film.description,
      director: film.director,
      rating: film.rating,
      image: film.image,
      cover: film.cover,
      tags: film.tags,
      schedule: (film.schedules || []).map((s) => this.mapScheduleToDto(s)),
    };
  }

  // Маппим сеанс -> DTO
  private mapScheduleToDto(schedule: Schedule): ScheduleResponseDto {
    return {
      id: schedule.id,
      daytime:
        schedule.daytime instanceof Date
          ? schedule.daytime.toISOString()
          : new Date(schedule.daytime).toISOString(),
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken
        ? schedule.taken.split(',').filter((seat) => seat.trim() !== '')
        : [],
      film: schedule.filmId,
    };
  }
}
