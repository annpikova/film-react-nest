import { Injectable } from '@nestjs/common';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class DataService {
  private films: Film[] = [];
  private schedules: Schedule[] = [];

  constructor() {
    this.initializeData();
  }

  getFilms(): Film[] {
    return this.films;
  }

  getSchedules(): Schedule[] {
    return this.schedules;
  }

  getScheduleById(id: string): Schedule | null {
    return this.schedules.find((schedule) => schedule.id === id) || null;
  }

  updateScheduleTakenSeats(id: string, takenSeats: string[]): void {
    const schedule = this.schedules.find((s) => s.id === id);
    if (schedule) {
      schedule.taken = takenSeats.join(',');
    }
  }

  private initializeData() {
    this.schedules = [
      {
        id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
        daytime: new Date('2024-06-28T10:00:53+03:00'),
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: '',
        filmId: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        film: null as any,
      },
      {
        id: '9647fcf2-d0fa-4e69-ad90-2b23cff15449',
        daytime: new Date('2024-06-28T10:00:53+03:00'),
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: '',
        filmId: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
        film: null as any,
      },
      {
        id: '351b437c-3430-4a35-b71d-b93b3d80274a',
        daytime: new Date('2024-06-28T10:00:53+03:00'),
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: '',
        filmId: '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
        film: null as any,
      },
      {
        id: '793009d6-030c-4dd4-8d13-9ba500724b38',
        daytime: new Date('2024-06-28T10:00:53+03:00'),
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: '3:3,1:4,1:5,1:3,1:2',
        filmId: '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
        film: null as any,
      },
      {
        id: 'd3f54ca3-8e19-4b63-afd4-6a8d03933339',
        daytime: new Date('2024-06-28T10:00:53+03:00'),
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: '',
        filmId: '0354a762-8928-427f-81d7-1656f717f39c',
        film: null as any,
      },
      {
        id: '5274c89d-f39c-40f9-bea8-f22a22a50c8a',
        daytime: new Date('2024-06-28T10:00:53+03:00'),
        hall: 0,
        rows: 5,
        seats: 10,
        price: 350,
        taken: '',
        filmId: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
        film: null as any,
      },
    ];

    this.films = [
      {
        id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
        title: 'Архитекторы общества',
        about:
          'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
        description:
          'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
        director: 'Итан Райт',
        rating: 2.9,
        image: '/bg1s.jpg',
        cover: '/bg1c.jpg',
        tags: ['Документальный'],
        schedules: [this.schedules[0]],
      },
      {
        id: '51b4bc85-646d-47fc-b988-3e7051a9fe9e',
        title: 'Недостижимая утопия',
        about:
          'Провокационный фильм-антиутопия, исследующий темы свободы, контроля и цены совершенства.',
        description:
          'Провокационный фильм-антиутопия режиссера Харрисона Рида. Действие фильма разворачивается в, казалось бы, идеальном обществе, и рассказывает о группе граждан, которые начинают подвергать сомнению систему. Фильм исследует темы свободы, контроля и цены совершенства.',
        director: 'Харрисон Рид',
        rating: 9.0,
        image: '/bg3s.jpg',
        cover: '/bg3c.jpg',
        tags: ['Рекомендуемые'],
        schedules: [this.schedules[1]],
      },
      {
        id: '3bedbc5a-844b-40eb-9d77-83b104e0cf75',
        title: 'Звёздное путешествие',
        about:
          'Научно-фантастический фильм о команде астронавтов, исследующий темы жизнестойкости, надежды и силы человеческих связей',
        description:
          '«Звёздное путешествие» — прекрасный научно-фантастический фильм о команде астронавтов, путешествующих по галактике в поисках нового дома для человечества. Помимо потрясающей работы оператора и специалистов по визуальным эффектам, можно отметить темы, исследуемые в фильме: жизнестойкости, надежды и силы человеческих связей.',
        director: 'Элиза Уиттакер',
        rating: 8.5,
        image: '/bg5s.jpg',
        cover: '/bg5c.jpg',
        tags: ['Рекомендуемые'],
        schedules: [this.schedules[2]],
      },
      {
        id: '5b70cb1a-61c9-47b1-b207-31f9e89087ff',
        title: 'Стражи Гримуара',
        about:
          'Фэнтезийное приключение об истинном значении дружбы, мужества и силы знаний',
        description:
          'Захватывающее фэнтезийное приключение, которое рассказывает о группе героев, которые должны защитить древний магический том от попадания в руки тёмного колдуна. История об истинном значении дружбы, мужества и силы знаний.',
        director: 'Лила Васкес',
        rating: 8.9,
        image: '/bg2s.jpg',
        cover: '/bg2c.jpg',
        tags: ['Рекомендуемые'],
        schedules: [this.schedules[3]],
      },
      {
        id: '0354a762-8928-427f-81d7-1656f717f39c',
        title: 'Парадокс Нексуса',
        about:
          'Фильм об эксперименте по соединению человеческих умов. Исследует вопросы неприкосновенности частной жизни, идентичности и самой природы человеческого сознания',
        description:
          'В фильме исследуются последствия новаторского эксперимента по соединению человеческих умов. По мере развития проекта участники сталкиваются с вопросами неприкосновенности частной жизни, идентичности и самой природы человеческого сознания.',
        director: 'Оливер Беннет',
        rating: 9.5,
        image: '/bg4s.jpg',
        cover: '/bg4c.jpg',
        tags: ['Рекомендуемые'],
        schedules: [this.schedules[4]],
      },
      {
        id: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
        title: 'Сон в летний день',
        about:
          'Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.',
        description:
          'Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?',
        director: 'Амелия Хьюз',
        rating: 8.1,
        image: '/bg6s.jpg',
        cover: '/bg6c.jpg',
        tags: ['Рекомендуемые'],
        schedules: [this.schedules[5]],
      },
    ];
  }
}
