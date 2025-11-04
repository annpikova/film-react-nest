# Film React Nest - Backend

**Автор:** Анна Пикова  
**Курс:** Фулстек Разработчик  
**Когорта:** 31

Этот проект представляет собой бэкенд для онлайн-сервиса бронирования билетов в кинотеатр, который может работать с двумя СУБД: MongoDB и PostgreSQL.

## Возможности

- Поддержка MongoDB и PostgreSQL через переменные окружения
- REST API для работы с фильмами и сеансами
- Бронирование билетов
- Раздача статического контента

## Установка и настройка

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне папки `backend`:

```env
# Database configuration
DATABASE_DRIVER=mongodb
DATABASE_URL=mongodb://localhost:27017/film

# PostgreSQL configuration (when DATABASE_DRIVER=postgres)
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=film_db
```

### 3. Настройка MongoDB

Для работы с MongoDB:

1. Установите и запустите MongoDB
2. Установите переменную `DATABASE_DRIVER=mongodb`
3. Укажите правильный `DATABASE_URL`

### 4. Настройка PostgreSQL

Для работы с PostgreSQL:

1. Установите PostgreSQL
2. Выполните скрипт инициализации:
   ```bash
   psql -U postgres -f test/prac.init.sql
   ```
3. Установите переменную `DATABASE_DRIVER=postgres`
4. Настройте остальные переменные PostgreSQL в `.env`
5. Запустите приложение для создания таблиц через TypeORM
6. Заполните таблицы тестовыми данными:
   ```bash
   psql -U film_user -d film_db -f test/prac.films.sql
   psql -U film_user -d film_db -f test/prac.schedules.sql
   ```

## Запуск

```bash
# Разработка
npm run start:dev

# Продакшен
npm run start:prod
```

## API Endpoints

### Фильмы

- `GET /api/afisha/films` - Получить список всех фильмов
- `GET /api/afisha/films/:id/schedule` - Получить фильм с расписанием сеансов

### Заказы

- `POST /order` - Создать заказ на бронирование билетов

### Статический контент

- `GET /content/afisha/*` - Получить статические файлы (изображения фильмов)

## Структура проекта

```
src/
├── entities/           # TypeORM сущности
├── repositories/       # Репозитории для работы с данными
├── database/          # Конфигурация базы данных
├── films/             # Модуль фильмов
├── order/             # Модуль заказов
└── app.module.ts      # Главный модуль приложения
```

## Технологии

- NestJS
- TypeORM
- PostgreSQL
- MongoDB (опционально)
- TypeScript