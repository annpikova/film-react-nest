import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true })
export class Screening {
  _id: Types.ObjectId;

  @Prop({ required: true }) daytime: Date; // ISO строка в БД → Date
  @Prop({ required: true, type: Number }) hall: number;
  @Prop({ required: true, min: 1, type: Number }) rows: number;
  @Prop({ required: true, min: 1, type: Number }) seats: number; // мест в ряду
  @Prop({ required: true, min: 0, type: Number }) price: number;

  @Prop({ type: [String], default: [] })
  taken: string[]; // вид "row:seat"
}
export const ScreeningSchema = SchemaFactory.createForClass(Screening);

@Schema({ collection: 'films' })
export class Film {
  _id: Types.ObjectId;

  @Prop({ required: true }) title: string;
  @Prop({ type: Number }) rating?: number;
  @Prop() director?: string;
  @Prop({ type: [String], default: [] }) tags?: string[];
  @Prop() about?: string;
  @Prop() description?: string;
  @Prop() image?: string; // /images/bg1s.jpg
  @Prop() cover?: string; // /images/bg1c.jpg

  @Prop({ type: [ScreeningSchema], default: [] })
  schedule: Screening[];
}
export type FilmDocument = Film & Document;
export const FilmSchema = SchemaFactory.createForClass(Film);
