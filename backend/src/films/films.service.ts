import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { Model, Types } from 'mongoose';
import { FilmsRepository } from './films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @InjectModel(Film.name) private readonly FilmModel: Model<FilmDocument>,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async listForCollection() {
    const docs = await this.filmsRepository.findAll();
    return docs.map((d: any) => ({
      id: d._id.toString(),
      rating: d.rating ? Number(d.rating) : null,
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
    if (!Types.ObjectId.isValid(id))
      throw new NotFoundException('Film not found');
    const doc: any = await this.filmsRepository.findById(id);
    if (!doc) throw new NotFoundException('Film not found');

    const items = (doc.schedule ?? []).map((s: any) => ({
      id: s.id || s._id?.toString(),
      daytime: new Date(s.daytime).toISOString(),
      hall: Number(s.hall),
      rows: Number(s.rows),
      seats: Number(s.seats),
      price: Number(s.price),
      taken: s.taken ?? [],
    }));
    return { total: items.length, items };
  }

  /** Атомарная попытка зарезервировать места (на одном сеансе). Возвращает true/false. */
  async tryReserve(
    filmId: string,
    screeningId: string,
    seatKeys: string[],
  ): Promise<boolean> {
    if (!Types.ObjectId.isValid(filmId)) return false;

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
      { $addToSet: { 'schedule.$.taken': { $each: seatKeys } } },
    );

    return res.modifiedCount === 1;
  }

  /** Получить данные сеанса для создания билета */
  async getSessionData(filmId: string, sessionId: string) {
    if (!Types.ObjectId.isValid(filmId)) {
      throw new NotFoundException('Film or session not found');
    }

    const doc: any = await this.FilmModel.findOne(
      {
        _id: new Types.ObjectId(filmId),
        'schedule._id': new Types.ObjectId(sessionId),
      },
      { 'schedule.$': 1 },
    ).lean();

    if (!doc || !doc.schedule || doc.schedule.length === 0) {
      throw new NotFoundException('Session not found');
    }

    const session = doc.schedule[0];
    return {
      daytime: new Date(session.daytime).toISOString(),
      price: Number(session.price),
    };
  }
}
