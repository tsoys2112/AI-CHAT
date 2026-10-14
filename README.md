# AI Chat — виджет в стиле Jivo

Демо-лендинг с плавающим виджетом чата ИИ-агента: приветствие, быстрые ответы, индикатор набора, светлая и тёмная тема.

## Запуск

```bash
npm install
npm run dev
```

Сборка: `npm run build`, предпросмотр: `npm run preview`.

## Переменные окружения

Скопируйте `.env.example` в `.env`. По умолчанию `VITE_USE_MOCK=true` — ответы генерируются в `src/mocks/agent.mock.js` с задержкой 600–1200 мс.

## Подключение API

Реализуйте POST в `src/data/chat.js` (см. комментарий в файле) и установите `VITE_USE_MOCK=false`.

## Структура

- `src/components/chat/` — UI виджета
- `src/hooks/useChat.js` — состояние диалога
- `src/hooks/useTheme.js` — тема (`localStorage`, ключ `theme`)
- `src/pages/DemoPage.jsx` — фоновый «сайт» для демонстрации
