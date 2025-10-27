import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film, Schedule } from '../entities';
import { InMemoryFilmsRepository } from './in-memory-films.repository';
import { InMemorySchedulesRepository } from './in-memory-schedules.repository';
import { AppRepository } from './app.repository';
import { DataService } from './data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [
    DataService,
    {
      provide: 'FilmsRepository',
      useClass: InMemoryFilmsRepository, // Используем in-memory для тестирования
    },
    {
      provide: 'SchedulesRepository',
      useClass: InMemorySchedulesRepository, // Используем in-memory для тестирования
    },
    AppRepository,
  ],
  exports: ['FilmsRepository', 'SchedulesRepository', AppRepository],
})
export class RepositoriesModule {}
