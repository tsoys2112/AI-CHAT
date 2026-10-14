import { useCallback, useEffect, useRef, useState } from 'react';
import { sendUserMessage } from '../data/chat.js';
import { QUICK_REPLIES, WELCOME_MESSAGE } from '../mocks/agent.mock.js';

function createUserMessage(text) {
  return {
    id: `user-${Date.now()}`,
    role: 'user',
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
}

export function useChat({ enabled }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [welcomeShown, setWelcomeShown] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const bottomRef = useRef(null);
  const sendingRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const showWelcome = useCallback(() => {
    if (welcomeShown) return;
    setWelcomeShown(true);
    setMessages([WELCOME_MESSAGE]);
    setShowQuickReplies(true);
  }, [welcomeShown]);

  useEffect(() => {
    if (enabled) showWelcome();
  }, [enabled, showWelcome]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || sendingRef.current) return;

      setShowQuickReplies(false);
      const userMsg = createUserMessage(trimmed);
      const nextHistory = [...messages, userMsg];
      setMessages(nextHistory);
      sendingRef.current = true;
      setIsTyping(true);

      try {
        const reply = await sendUserMessage(trimmed, nextHistory);
        setMessages((prev) => [...prev, reply]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            text: 'Не удалось отправить сообщение. Попробуйте ещё раз чуть позже.',
            createdAt: new Date().toISOString(),
          },
        ]);
      } finally {
        setIsTyping(false);
        sendingRef.current = false;
      }
    },
    [messages],
  );

  return {
    messages,
    isTyping,
    showQuickReplies,
    quickReplies: QUICK_REPLIES,
    sendMessage,
    bottomRef,
    showWelcome,
  };
}
