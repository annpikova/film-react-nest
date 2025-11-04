import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { InMemoryFilmsRepository } from './in-memory-films.repository';
import { InMemorySchedulesRepository } from './in-memory-schedules.repository';
import { AppRepository } from './app.repository';

@Module({
  providers: [
    DataService,

    InMemoryFilmsRepository,
    InMemorySchedulesRepository,

    // Токены, которые ждут сервисы
    {
      provide: 'FilmsRepository',
      useExisting: InMemoryFilmsRepository,
    },
    {
      provide: 'SchedulesRepository',
      useExisting: InMemorySchedulesRepository,
    },

    AppRepository,
  ],
  exports: ['FilmsRepository', 'SchedulesRepository', AppRepository],
})
export class RepositoriesModule {}
