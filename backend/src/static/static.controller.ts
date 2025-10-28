import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'node:path';
import * as fs from 'fs';

@Controller('content/afisha')
export class StaticController {
  @Get()
  getDefaultImage(@Res() res: Response) {
    // Для тестов - возвращаем любую картинку
    const imagePath = path.join(
      process.cwd(),
      'public',
      'content',
      'afisha',
      'bg1c.jpg',
    );

    return res.sendFile(imagePath);
  }

  @Get(':filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    // Проверяем, что файл существует
    const imagePath = path.join(
      process.cwd(),
      'public',
      'content',
      'afisha',
      filename,
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.sendFile(imagePath);
  }
}
