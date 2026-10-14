import { getHealth } from '../server/chat.js';

export default function handler(_req, res) {
  res.status(200).json(getHealth());
}
