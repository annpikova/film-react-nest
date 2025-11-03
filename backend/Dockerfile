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

# Продакшн образ
FROM node:20-alpine

WORKDIR /app

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем собранный код
COPY --from=builder /app/dist ./dist

# Копируем публичные файлы
COPY --from=builder /app/public ./public

# Открываем порт
EXPOSE 3000

# Запускаем продакшн версию
CMD ["node", "dist/main.js"]

