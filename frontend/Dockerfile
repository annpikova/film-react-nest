FROM node:20-alpine AS builder

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Финальный образ для копирования dist
FROM alpine:latest

WORKDIR /app

# Копируем собранные файлы
COPY --from=builder /app/dist ./dist

# Команда для копирования файлов в volume при запуске
CMD ["sh", "-c", "cp -r /app/dist/* /output/ 2>/dev/null || true"]

