import { Module } from '@nestjs/common';
import { FilmsController } from './controllers/films.controller';
import { FilmsService } from './services/films.service';
import { RepositoriesModule } from '../repositories/repositories.module';

@Module({
  imports: [RepositoriesModule],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [FilmsService],
})
export class FilmsModule {}
