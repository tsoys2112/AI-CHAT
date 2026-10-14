import ChatComposer from './ChatComposer.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageList from './MessageList.jsx';
import styles from './ChatPanel.module.css';

export default function ChatPanel({
  theme,
  onToggleTheme,
  onMinimize,
  onClose,
  messages,
  isTyping,
  bottomRef,
  showQuickReplies,
  quickReplies,
  onSend,
  onQuickReply,
}) {
  return (
    <div className={styles.panel} role="dialog" aria-label="Чат с помощником">
      <ChatHeader
        theme={theme}
        onToggleTheme={onToggleTheme}
        onMinimize={onMinimize}
        onClose={onClose}
      />
      <div className={styles.body}>
        <MessageList
          theme={theme}
          messages={messages}
          isTyping={isTyping}
          bottomRef={bottomRef}
          showQuickReplies={showQuickReplies}
          quickReplies={quickReplies}
          onQuickReply={onQuickReply}
          sendingDisabled={isTyping}
        />
        <ChatComposer onSend={onSend} disabled={isTyping} />
      </div>
    </div>
  );
}
