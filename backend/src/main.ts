import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';
import { LoggerService } from '@nestjs/common';

function getLogger(): LoggerService {
  const loggerType = process.env.LOGGER_TYPE || 'dev';

  switch (loggerType.toLowerCase()) {
    case 'json':
      return new JsonLogger();
    case 'tskv':
      return new TskvLogger();
    case 'dev':
    default:
      return new DevLogger();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  // Не устанавливаем глобальный префикс, так как контроллеры уже имеют префикс 'api/afisha'
  app.enableCors();
  app.useLogger(getLogger());
  await app.listen(3000);
}
bootstrap();
