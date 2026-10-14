export const MOCK_AGENT = {
  id: 'mock-agent-1',
  name: 'Помощник',
  title: 'ИИ-агент',
};

export const WELCOME_MESSAGE = {
  id: 'msg-welcome',
  role: 'assistant',
  text:
    'Здравствуйте! Я виртуальный помощник. Помогу с вопросами по сервису, тарифам и настройке. Чем могу помочь?',
  createdAt: new Date().toISOString(),
};

export const QUICK_REPLIES = [
  'Как начать работу?',
  'Сколько стоит?',
  'Связаться с поддержкой',
];

let messageCounter = 1;

function createMessageId() {
  messageCounter += 1;
  return `mock-msg-${messageCounter}`;
}

const KEYWORD_REPLIES = [
  {
    test: /тариф|стоим|цен|сколько/i,
    text:
      'У нас есть базовый план от 990 ₽/мес и расширенный с аналитикой — от 2490 ₽/мес. Могу подробнее рассказать про функции каждого.',
  },
  {
    test: /начать|старт|подключ/i,
    text:
      'Чтобы начать: зарегистрируйтесь на сайте, подтвердите почту и откройте раздел «Настройки». Там же можно подключить виджет чата за пару минут.',
  },
  {
    test: /поддерж|оператор|человек|менеджер/i,
    text:
      'Сейчас отвечаю я, но при сложном вопросе могу передать заявку в поддержку. Опишите проблему — зафиксирую и укажу срок ответа (обычно до 2 часов в рабочее время).',
  },
  {
    test: /время|график|работа/i,
    text: 'Поддержка на связи пн–пт с 9:00 до 18:00 (МСК). Я доступен круглосуточно и отвечаю сразу.',
  },
];

const FALLBACK_REPLIES = [
  'Спасибо за сообщение! Уточните, пожалуйста, что именно вас интересует — тарифы, подключение или техническая настройка?',
  'Понял вас. Если нужно, могу прислать пошаговую инструкцию или передать вопрос специалисту.',
];

export function getMockAgentReply(userText, _history) {
  const normalized = userText.trim();
  const matched = KEYWORD_REPLIES.find((rule) => rule.test.test(normalized));
  const text = matched
    ? matched.text
    : FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];

  return {
    id: createMessageId(),
    role: 'assistant',
    text,
    createdAt: new Date().toISOString(),
  };
}
