import { Module, DynamicModule } from '@nestjs/common';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    // Ничего не подключаем. Нам не нужна реальная БД,
    // мы работаем на in-memory репозитории.
    return {
      module: DatabaseModule,
      imports: [],
      exports: [],
    };
  }
}
