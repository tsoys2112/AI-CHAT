import { getMockAgentReply } from '../mocks/agent.mock.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function randomTypingDelay() {
  return 600 + Math.floor(Math.random() * 600);
}

export async function sendUserMessage(text, history) {
  if (USE_MOCK) {
    await delay(randomTypingDelay());
    return getMockAgentReply(text, history);
  }

  // Будущее подключение API (без streaming):
  // const res = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message: text, history }),
  // });
  // if (!res.ok) throw new Error('Ошибка сервера');
  // return res.json();

  throw new Error('API не подключён');
}
