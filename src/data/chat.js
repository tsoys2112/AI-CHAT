import { getMockAgentReply } from '../mocks/agent.mock.js';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

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

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: text,
      history: history.map(({ role, text: t }) => ({ role, text: t })),
    }),
  });
  if (!res.ok) throw new Error('Ошибка сервера');
  return res.json();
}
