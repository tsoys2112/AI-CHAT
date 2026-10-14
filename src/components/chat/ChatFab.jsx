import SupportAgentAvatar from './SupportAgentAvatar.jsx';
import styles from './ChatFab.module.css';

export default function ChatFab({ onClick, hasUnread, pulseActive, hidden }) {
  if (hidden) return null;

  return (
    <div className={styles.fabRoot}>
      {pulseActive ? (
        <>
          <span className={styles.ripple} aria-hidden="true" />
          <span className={`${styles.ripple} ${styles.rippleDelayed}`} aria-hidden="true" />
        </>
      ) : null}
      <button
        type="button"
        className={styles.fab}
        onClick={onClick}
        aria-label="Открыть чат"
      >
        <span className={styles.avatarWrap}>
          <SupportAgentAvatar />
        </span>
        {hasUnread ? <span className={styles.badge} aria-hidden="true" /> : null}
      </button>
    </div>
  );
}
