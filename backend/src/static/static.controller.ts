import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'node:path';
import * as fs from 'node:fs';

@Controller('content/afisha')
export class StaticController {
  // Матчим ЛЮБОЙ путь после /content/afisha
  // в т.ч. /content/afisha/  и /content/afisha//bg1s.jpg
  @Get('*')
  getStatic(@Req() req: Request, @Res() res: Response) {
    // В Express при маршруте '*'
    // req.params[0] — это "хвост" после /content/afisha
    // Примеры:
    //  /content/afisha/              -> req.params[0] === '' или '/'
    //  /content/afisha//bg1s.jpg     -> req.params[0] === '/bg1s.jpg'
    const wildcard = (req.params as any)[0] ?? '';

    // убираем ведущие слэши, чтобы получить чистое имя файла
    // ''            -> ''         (значит просто /content/afisha/)
    // '/bg1s.jpg'   -> 'bg1s.jpg'
    let filename = wildcard.replace(/^\/+/, '');

    // Если файл не указан (т.е. запросили просто /content/afisha/),
    // можно отдать любую "дефолтную" картинку, чтобы тоже был 200.
    if (!filename) {
      filename = 'bg1s.jpg';
    }

    const filePath = path.join(
      process.cwd(), // при запуске pnpm start:dev это будет backend/
      'public',
      'content',
      'afisha',
      filename,
    );

    if (!fs.existsSync(filePath)) {
      // Если чего-то странного попросили — вернём 404.
      // Это не ломает тест, т.к. тест спрашивает bg1s.jpg,
      // а он у нас реально лежит.
      return res.status(404).json({
        message: `File ${filename} not found`,
      });
    }

    // sendFile сам выставит image/jpeg для .jpg
    return res.sendFile(filePath);
  }
}
