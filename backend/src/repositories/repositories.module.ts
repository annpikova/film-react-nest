import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Film, Schedule } from '../entities';
import { TypeOrmFilmsRepository } from './typeorm-films.repository';
import { TypeOrmSchedulesRepository } from './typeorm-schedules.repository';
import { InMemoryFilmsRepository } from './in-memory-films.repository';
import { InMemorySchedulesRepository } from './in-memory-schedules.repository';
import { AppRepository } from './app.repository';
import { DataService } from './data.service';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Schedule])],
  providers: [
    DataService,
    TypeOrmFilmsRepository,
    TypeOrmSchedulesRepository,
    InMemoryFilmsRepository,
    InMemorySchedulesRepository,
    {
      provide: 'FilmsRepository',
      useFactory: (
        configService: ConfigService,
        typeOrmFilmsRepo: TypeOrmFilmsRepository,
        inMemoryFilmsRepo: InMemoryFilmsRepository,
      ) => {
        const driver = configService.get<string>('DATABASE_DRIVER', 'mongodb');
        return driver === 'postgres' ? typeOrmFilmsRepo : inMemoryFilmsRepo;
      },
      inject: [ConfigService, TypeOrmFilmsRepository, InMemoryFilmsRepository],
    },
    {
      provide: 'SchedulesRepository',
      useFactory: (
        configService: ConfigService,
        typeOrmSchedulesRepo: TypeOrmSchedulesRepository,
        inMemorySchedulesRepo: InMemorySchedulesRepository,
      ) => {
        const driver = configService.get<string>('DATABASE_DRIVER', 'mongodb');
        return driver === 'postgres'
          ? typeOrmSchedulesRepo
          : inMemorySchedulesRepo;
      },
      inject: [
        ConfigService,
        TypeOrmSchedulesRepository,
        InMemorySchedulesRepository,
      ],
    },
    AppRepository,
  ],
  exports: ['FilmsRepository', 'SchedulesRepository', AppRepository],
})
export class RepositoriesModule {}
