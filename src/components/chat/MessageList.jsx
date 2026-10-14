import ChatBackground3D from './ChatBackground3D.jsx';
import MessageBubble from './MessageBubble.jsx';
import QuickReplies from './QuickReplies.jsx';
import TypingIndicator from './TypingIndicator.jsx';
import styles from './MessageList.module.css';

export default function MessageList({
  theme,
  messages,
  isTyping,
  bottomRef,
  showQuickReplies,
  quickReplies,
  onQuickReply,
  sendingDisabled,
}) {
  return (
    <div className={styles.list} role="log" aria-live="polite">
      <ChatBackground3D key={theme} />
      <div className={styles.messages}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping ? <TypingIndicator /> : null}
        {showQuickReplies ? (
          <QuickReplies
            items={quickReplies}
            onSelect={onQuickReply}
            disabled={sendingDisabled}
          />
        ) : null}
        <div ref={bottomRef} className={styles.anchor} />
      </div>
    </div>
  );
}
