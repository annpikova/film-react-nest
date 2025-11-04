-- Создание базы данных и пользователя для проекта Film
-- Выполнять от имени супер-пользователя postgres

-- Создание пользователя
CREATE USER film_user WITH PASSWORD 'film_password';

-- Создание базы данных
CREATE DATABASE film_db OWNER film_user;

-- Предоставление прав пользователю
GRANT ALL PRIVILEGES ON DATABASE film_db TO film_user;

-- Подключение к базе данных film_db
\c film_db;

-- Предоставление прав на схему public
GRANT ALL ON SCHEMA public TO film_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO film_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO film_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO film_user;

-- Установка прав по умолчанию для будущих таблиц
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO film_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO film_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO film_user;

