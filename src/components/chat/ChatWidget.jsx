import { useCallback, useState } from 'react';
import { useChat } from '../../hooks/useChat.js';
import ChatFab from './ChatFab.jsx';
import ChatPanel from './ChatPanel.jsx';
import styles from './ChatWidget.module.css';

export default function ChatWidget({ theme, onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [hasEverOpened, setHasEverOpened] = useState(false);

  const chatEnabled = isOpen;
  const {
    messages,
    isTyping,
    showQuickReplies,
    quickReplies,
    sendMessage,
    bottomRef,
  } = useChat({ enabled: chatEnabled });

  const open = useCallback(() => {
    setHasEverOpened(true);
    setIsOpen(true);
    setHasUnread(false);
  }, []);

  const minimize = useCallback(() => {
    setIsOpen(false);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleQuickReply = useCallback(
    (text) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  return (
    <div className={styles.root}>
      {isOpen ? (
        <ChatPanel
          theme={theme}
          onToggleTheme={onToggleTheme}
          onMinimize={minimize}
          onClose={close}
          messages={messages}
          isTyping={isTyping}
          bottomRef={bottomRef}
          showQuickReplies={showQuickReplies}
          quickReplies={quickReplies}
          onSend={sendMessage}
          onQuickReply={handleQuickReply}
        />
      ) : null}
      <ChatFab
        onClick={open}
        hasUnread={hasUnread && !isOpen}
        pulseActive={!hasEverOpened}
        hidden={isOpen}
      />
    </div>
  );
}
