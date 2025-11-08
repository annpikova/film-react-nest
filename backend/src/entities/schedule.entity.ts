import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp' })
  daytime: Date;

  @Column({ type: 'int' })
  hall: number;

  @Column({ type: 'int' })
  rows: number;

  @Column({ type: 'int' })
  seats: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'text', default: '' })
  taken: string;

  @Column({ name: 'film_id', type: 'uuid' })
  filmId: string;

  @ManyToOne(() => Film, (film) => film.schedules)
  @JoinColumn({ name: 'film_id' })
  film: Film;
}
