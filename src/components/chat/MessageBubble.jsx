import SupportAgentAvatar from './SupportAgentAvatar.jsx';
import styles from './MessageBubble.module.css';

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`${styles.row} ${isUser ? styles.rowUser : styles.rowAgent}`}
    >
      {!isUser ? (
        <SupportAgentAvatar size="sm" className={styles.avatar} />
      ) : null}
      <div className={styles.content}>
        <div
          className={`${styles.bubble} ${isUser ? styles.bubbleUser : styles.bubbleAgent}`}
        >
          {message.text}
        </div>
        <time className={styles.time} dateTime={message.createdAt}>
          {formatTime(message.createdAt)}
        </time>
      </div>
    </div>
  );
}
