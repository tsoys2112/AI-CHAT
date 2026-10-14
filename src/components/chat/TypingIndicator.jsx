import SupportAgentAvatar from './SupportAgentAvatar.jsx';
import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles.row} aria-live="polite" aria-label="Агент печатает">
      <SupportAgentAvatar size="sm" className={styles.avatar} />
      <div className={styles.bubble}>
        <span className={styles.dots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.label}>печатает…</span>
      </div>
    </div>
  );
}
