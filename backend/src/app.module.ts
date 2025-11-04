import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { StaticModule } from './static/static.module';

@Module({
  imports: [
    // Делаем ConfigService глобальным (AppRepository его ждёт)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Бизнес-модули
    FilmsModule,
    OrderModule,
    StaticModule,
  ],
})
export class AppModule {}
