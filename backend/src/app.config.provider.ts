import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService],
  provide: 'CONFIG',
  useFactory: (cfg: ConfigService): AppConfig => ({
    database: {
      driver: cfg.get<string>('DB_DRIVER', 'mongodb'),
      url: cfg.get<string>('DB_URL', 'mongodb://localhost:27017/films'),
    },
  }),
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
