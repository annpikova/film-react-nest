import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useFactory: () => {
    const driver = process.env.DATABASE_DRIVER || 'mongodb';
    const username = process.env.DATABASE_USERNAME || 'postgres';
    const password = process.env.DATABASE_PASSWORD || 'password';
    const host = process.env.DATABASE_HOST || 'localhost';
    const port = parseInt(process.env.DATABASE_PORT || '5432');
    const name = process.env.DATABASE_NAME || 'film_db';

    // Формируем DATABASE_URL из отдельных переменных, если он не указан явно
    let url = process.env.DATABASE_URL;
    if (!url) {
      if (driver === 'postgres') {
        url = `postgresql://${username}:${password}@${host}:${port}/${name}`;
      } else {
        url = `mongodb://${host}:${port}/${name}`;
      }
    }

    return {
      database: {
        driver,
        url,
        username,
        password,
        host,
        port,
        name,
      },
    };
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
  name?: string;
}
