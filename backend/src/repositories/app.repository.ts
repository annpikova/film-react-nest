import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilmsRepository, SchedulesRepository } from './interfaces';

@Injectable()
export class AppRepository {
  constructor(
    private readonly configService: ConfigService,
    @Inject('FilmsRepository')
    private readonly filmsRepository: FilmsRepository,
    @Inject('SchedulesRepository')
    private readonly schedulesRepository: SchedulesRepository,
  ) {}

  get films(): FilmsRepository {
    return this.filmsRepository;
  }

  get schedules(): SchedulesRepository {
    return this.schedulesRepository;
  }

  get databaseDriver(): string {
    return this.configService.get<string>('DATABASE_DRIVER', 'mongodb');
  }
}

