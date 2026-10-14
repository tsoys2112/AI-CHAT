export const MOCK_AGENT = {
  id: 'mock-agent-1',
  name: 'Консультант',
  title: 'Солнечная энергетика',
};

export const WELCOME_MESSAGE = {
  id: 'msg-welcome',
  role: 'assistant',
  text:
    'Здравствуйте! Я консультант магазина «СолнцеДом». Помогу подобрать солнечные панели, инвертор, аккумуляторы или готовый комплект и отвечу на вопросы по товарам. Что вас интересует?',
  createdAt: new Date().toISOString(),
};

export const QUICK_REPLIES = [
  'Подобрать комплект для дачи',
  'Сколько стоит панель 450 Вт?',
  'Какая гарантия на оборудование?',
];

let messageCounter = 1;

function createMessageId() {
  messageCounter += 1;
  return `mock-msg-${messageCounter}`;
}

const KEYWORD_REPLIES = [
  {
    test: /комплект|дач|дом/i,
    text:
      'Для дачи подойдёт комплект «Дача» 3 кВт (189 000 ₽): 6 панелей 450 Вт, инвертор 3 кВт и 2 АКБ. Для дома с запасом энергии на ночь — «Дом» 5 кВт гибридный (349 000 ₽). Сколько кВт·ч в сутки вы потребляете?',
  },
  {
    test: /панел|450|200 ?вт/i,
    text:
      'Панель SunPeak 450 Вт Mono — 17 900 ₽ (КПД 22,1%), SunPeak 200 Вт — 8 400 ₽. Обе в наличии. Для какой мощности станции вы подбираете панели?',
  },
  {
    test: /инвертор/i,
    text:
      'Гибридный инвертор HelioPower 5 кВт — 74 500 ₽ (с MPPT и Wi-Fi мониторингом), автономный 3 кВт — 38 900 ₽ (под заказ, 5–7 дней). Нужна ли вам работа с сетью или полная автономность?',
  },
  {
    test: /аккумул|акб|батаре/i,
    text:
      'Литиевый LiFePO4 48 В 100 А·ч — 128 000 ₽ (до 6000 циклов), гелевый DeepCycle 12 В 200 А·ч — 24 900 ₽ (до 1200 циклов). Литий дороже, но служит заметно дольше.',
  },
  {
    test: /гаранти/i,
    text:
      'Гарантия: панели — 12 лет на изделие и 25 лет на мощность, инверторы и АКБ — 10 лет, контроллеры — 5 лет.',
  },
  {
    test: /доставк/i,
    text: 'Доставляем по России за 2–7 дней, по Москве — на следующий день. От 50 000 ₽ доставка бесплатная.',
  },
  {
    test: /заказ|оплат|возврат|скидк|поддерж|оператор|человек|менеджер/i,
    text:
      'С заказами, оплатой и другими вопросами не по товарам поможет живой специалист — напишите в Telegram: @tsoy2112 (https://t.me/tsoy2112).',
  },
];

const FALLBACK_REPLIES = [
  'Я консультирую только по товарам для солнечной энергетики. С другими вопросами поможет специалист в Telegram: @tsoy2112 (https://t.me/tsoy2112).',
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
