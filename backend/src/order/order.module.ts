import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [FilmsModule],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
