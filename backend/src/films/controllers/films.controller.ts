import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { FilmResponseDto, ScheduleResponseDto } from '../dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll(): Promise<{ total: number; items: FilmResponseDto[] }> {
    return this.filmsService.findAll();
  }

  @Get(':id/schedule')
  async findByIdWithSchedules(
    @Param('id') id: string,
  ): Promise<{ total: number; items: ScheduleResponseDto[] }> {
    const film = await this.filmsService.findByIdWithSchedules(id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    return {
      total: film.schedule?.length || 0,
      items: film.schedule || [],
    };
  }
}
