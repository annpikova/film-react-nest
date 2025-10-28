import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Film, Schedule } from '../entities';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const driver = configService.get<string>(
              'DATABASE_DRIVER',
              'mongodb',
            );

            if (driver === 'postgres') {
              return {
                type: 'postgres',
                host: configService.get<string>('DATABASE_HOST', 'localhost'),
                port: configService.get<number>('DATABASE_PORT', 5432),
                username: configService.get<string>(
                  'DATABASE_USERNAME',
                  'postgres',
                ),
                password: configService.get<string>(
                  'DATABASE_PASSWORD',
                  'password',
                ),
                database: configService.get<string>('DATABASE_NAME', 'film_db'),
                entities: [Film, Schedule],
                synchronize: true, // В продакшене должно быть false
                logging: false,
              };
            }

            // Fallback для MongoDB (если нужно)
            return {
              type: 'mongodb',
              url: configService.get<string>(
                'DATABASE_URL',
                'mongodb://localhost:27017/film',
              ),
              entities: [],
              synchronize: true,
              logging: false,
            };
          },
        }),
        TypeOrmModule.forFeature([Film, Schedule]),
      ],
      exports: [TypeOrmModule],
    };
  }
}
