# AI Chat — виджет в стиле Jivo

Демо-лендинг с плавающим виджетом чата ИИ-агента: приветствие, быстрые ответы, индикатор набора, светлая и тёмная тема.

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`, предпросмотр: `npm run preview`.

## Backend на Gemini

Ответы формирует `server/index.js` (без зависимостей, Node 20+): принимает `POST /api/chat`, вызывает Gemini REST API с системным промптом и историей диалога. Ключ хранится только на сервере.

1. `cp .env.example .env` и впишите `GEMINI_API_KEY`.
2. В двух терминалах: `npm run server` и `npm run dev` (Vite проксирует `/api` на порт 3001).

Модель задаётся `GEMINI_MODEL` (по умолчанию `gemini-3.8-flash`). Проверка: `GET /api/health`.

## Переменные окружения

- `VITE_USE_MOCK=true` — ответы из `src/mocks/agent.mock.js` без backend.
- `GEMINI_API_KEY`, `GEMINI_MODEL`, `PORT` — настройки backend.

## Структура

- `src/components/chat/` — UI виджета
- `src/hooks/useChat.js` — состояние диалога
- `src/hooks/useTheme.js` — тема (`localStorage`, ключ `theme`)
- `src/pages/DemoPage.jsx` — фоновый «сайт» для демонстрации
