import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
  ) {}

  findAll() {
    return this.filmModel.find().lean().exec();
  }

  findById(id: string) {
    // поддержим и ObjectId, и строковый _id
    const isObjectId = Types.ObjectId.isValid(id);
    return isObjectId
      ? this.filmModel.findById(id).lean().exec()
      : this.filmModel.findOne({ _id: id }).lean().exec();
  }
}
