import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private readonly FilmModel: Model<FilmDocument>) {}

  async listForCollection() {
    const docs = await this.FilmModel.find({}, { schedule: 0 }).lean();
    return docs.map((d: any) => ({
      id: d._id.toString(),
      rating: d.rating ?? null,
      director: d.director ?? '',
      tags: d.tags ?? [],
      title: d.title,
      about: d.about ?? '',
      description: d.description ?? '',
      image: d.image ?? '',
      cover: d.cover ?? '',
    }));
  }

  async scheduleForCollection(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new NotFoundException('Film not found');
    const doc: any = await this.FilmModel.findById(new Types.ObjectId(id)).lean();
    if (!doc) throw new NotFoundException('Film not found');

    const items = (doc.schedule ?? []).map((s: any) => ({
      id: s._id.toString(),
      daytime: new Date(s.daytime).toISOString(),
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ?? [],
    }));
    return { total: items.length, items };
  }

  /** Атомарная попытка зарезервировать места (на одном сеансе). Возвращает true/false. */
  async tryReserve(filmId: string, screeningId: string, seatKeys: string[]): Promise<boolean> {
    if (!Types.ObjectId.isValid(filmId) || !Types.ObjectId.isValid(screeningId)) return false;

    // Важно: проверка и апдейт ОДНОГО и того же элемента массива через $elemMatch
    const res = await this.FilmModel.updateOne(
      {
        _id: new Types.ObjectId(filmId),
        schedule: {
          $elemMatch: {
            _id: new Types.ObjectId(screeningId),
            // ни одно из мест не должно присутствовать
            taken: { $not: { $elemMatch: { $in: seatKeys } } },
          },
        },
      },
      { $addToSet: { 'schedule.$.taken': { $each: seatKeys } } }
    );

    return res.modifiedCount === 1;
  }
}