import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('/api/afisha')
export class FilmsController {
  constructor(private readonly films: FilmsService) {}

  // GET /api/afisha/films
  @Get('films')
  async list() {
    const items = await this.films.listForCollection();
    return { total: items.length, items };
  }

  // GET /api/afisha/films/:id/schedule (правильный)
  @Get('films/:id/schedule')
  async schedule(@Param('id') id: string) {
    return this.films.scheduleForCollection(id);
  }

  // GET /api/afisha/films/:id/shedule (совместимость с Postman-коллекцией)
  @Get('films/:id/shedule')
  async scheduleTypo(@Param('id') id: string) {
    return this.films.scheduleForCollection(id);
  }
}