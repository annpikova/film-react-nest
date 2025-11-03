import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { FilmResponseDto, ScheduleResponseDto } from '../dto/films.dto';

@Controller('api/afisha')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('films')
  @Get('films/')
  async findAll(): Promise<{ total: number; items: FilmResponseDto[] }> {
    return this.filmsService.findAll();
  }

  @Get('films/:id/schedule')
  @Get('films/:id/schedule/')
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
