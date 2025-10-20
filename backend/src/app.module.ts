import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { FilmsModule } from './films/films.module';
import { OrdersModule } from './order/order.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGODB_URI') ?? 'mongodb://localhost:27017/film',
      }),
    }),

    // Статика: /content/afisha/* и /images/*
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const cwd = process.cwd();
        const publicDir = cfg.get('STATIC_DIR') ?? 'public';
        const imagesDir = cfg.get('IMAGES_DIR') ?? 'public/images';
        return [
          {
            rootPath: join(cwd, publicDir, 'content', 'afisha'),
            serveRoot: '/content/afisha',
            serveStaticOptions: {
              index: ['bg1c.jpg'], // Default to image instead of HTML
            },
          },
          { rootPath: join(cwd, imagesDir), serveRoot: '/images' },
        ];
      },
    }),

    FilmsModule,
    OrdersModule,
    SeedModule,
  ],
})
export class AppModule {}
