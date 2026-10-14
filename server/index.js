import { createServer } from 'node:http';
import { getHealth, handleChat } from './chat.js';

const PORT = Number(process.env.PORT) || 3001;
const MAX_BODY_BYTES = 64 * 1024;

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/health') {
    return sendJson(res, 200, getHealth());
  }
  if (req.method !== 'POST' || req.url !== '/api/chat') {
    return sendJson(res, 404, { error: 'Not found' });
  }
  try {
    const body = JSON.parse(await readBody(req));
    const { status, body: payload } = await handleChat(body);
    sendJson(res, status, payload);
  } catch {
    sendJson(res, 400, { error: 'Некорректный запрос' });
  }
});

server.listen(PORT, () => {
  console.log(`Chat backend: http://localhost:${PORT} (model ${getHealth().model})`);
});
