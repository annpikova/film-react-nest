# FILM!

## Установка

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

* `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `postgres` 
* `DATABASE_URL` - адрес СУБД PostgreSQL, например `postgresql://postgres:password@localhost:5432/film_db`.  

PostgreSQL должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.

## Docker

### Локальная разработка

Для запуска проекта в Docker Compose:

```bash
docker compose up -d --build
```

После запуска будут доступны:
- Frontend и API: http://localhost:80
- Backend API: http://localhost:3000
- pgAdmin: http://localhost:8080

Для остановки:
```bash
docker compose down
```

### Инициализация базы данных

После запуска контейнеров подключитесь к pgAdmin (http://localhost:8080) с учетными данными:
- Email: `admin@example.com`
- Password: `admin`

Добавьте подключение к базе данных:
- Host: `postgres`
- Port: `5432`
- Database: `film_db`
- Username: `postgres`
- Password: `password`

Выполните SQL скрипты из `backend/test/` в следующем порядке:
1. `prac.init.sql` - создание таблиц
2. `prac.films.sql` - заполнение фильмов
3. `prac.schedules.sql` - заполнение расписания

## Логгеры

Проект поддерживает три типа логгеров, которые можно выбрать через переменную окружения `LOGGER_TYPE`:

- `dev` (по умолчанию) - DevLogger - удобный формат для разработки
- `json` - JsonLogger - логи в формате JSON
- `tskv` - TskvLogger - логи в формате TSKV (Tab-Separated Key-Value)

Пример использования:
```bash
LOGGER_TYPE=json npm start
```

## Тесты

Запуск тестов:
```bash
cd backend
npm test
```

Запуск тестов с покрытием:
```bash
npm run test:cov
```

## Деплой

### GitHub Actions

При push в ветки `main`, `master` или `review-5` автоматически запускается сборка и публикация Docker образов в GitHub Container Registry (ghcr.io).

Образы:
- `ghcr.io/annpikova/film-frontend:latest`
- `ghcr.io/annpikova/film-backend:latest`
- `ghcr.io/annpikova/film-nginx:latest`

### Деплой на сервер

1. Подключитесь к серверу по SSH:
```bash
ssh -i ~/Desktop/yandex-key annpikova@84.201.139.161
```

2. Установите Docker и Docker Compose (если еще не установлены):
```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

3. Создайте директорию проекта:
```bash
mkdir -p ~/film-app
cd ~/film-app
```

4. Скопируйте `docker-compose.prod.yml` на сервер и запустите:
```bash
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

5. Проверьте статус контейнеров:
```bash
docker compose -f docker-compose.prod.yml ps
```

6. Инициализируйте базу данных через pgAdmin (http://84.201.139.161:8080) или через SSH туннель:
```bash
ssh -i ~/Desktop/yandex-key -L 8080:localhost:8080 annpikova@84.201.139.161
```

7. После заполнения базы данных можно закрыть порт 8080 через firewall:
```bash
sudo ufw deny 8080
```

### Обновление приложения

Для обновления приложения на сервере:
```bash
cd ~/film-app
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## Ссылки

- [Задеплоенное приложение](http://84.201.139.161)
- [API документация](http://84.201.139.161/api/afisha/films)
- pgAdmin: http://84.201.139.161:8080




