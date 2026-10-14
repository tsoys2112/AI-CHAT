import { MOCK_AGENT } from '../../mocks/agent.mock.js';
import SupportAgentAvatar from './SupportAgentAvatar.jsx';
import styles from './ChatHeader.module.css';

function ThemeIcon({ theme }) {
  if (theme === 'dark') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.5 5.5 0 0 1-4.4 2.26 5.5 5.5 0 0 1-5.44-6.24A9 9 0 0 0 12 3z"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5M2 13h2a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2m18 0h2a1 1 0 0 0 0-2h-2a1 1 0 0 0 0 2M11 2v2a1 1 0 0 0 2 0V2a1 1 0 0 0-2 0m0 18v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0M5.6 5.6 4.2 4.2a1 1 0 0 0-1.4 1.4l1.4 1.4a1 1 0 0 0 1.4-1.4m12.8 12.8 1.4 1.4a1 1 0 0 0 1.4-1.4l-1.4-1.4a1 1 0 0 0-1.4 1.4M4.2 19.8a1 1 0 0 0 1.4 0l1.4-1.4a1 1 0 1 0-1.4-1.4l-1.4 1.4a1 1 0 0 0 0 1.4m14.2-14.2a1 1 0 0 0 0-1.4l-1.4-1.4a1 1 0 0 0-1.4 1.4l1.4 1.4a1 1 0 0 0 1.4 0"
      />
    </svg>
  );
}

export default function ChatHeader({
  onMinimize,
  onClose,
  theme,
  onToggleTheme,
}) {
  return (
    <header className={styles.header}>
      <div className={styles.agent}>
        <SupportAgentAvatar size="lg" className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.name}>{MOCK_AGENT.name}</span>
          <span className={styles.status}>
            <span className={styles.dot} />
            Онлайн
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onToggleTheme}
          aria-label={theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему'}
        >
          <ThemeIcon theme={theme} />
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onMinimize}
          aria-label="Свернуть чат"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path fill="currentColor" d="M19 13H5v-2h14v2z" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label="Закрыть чат"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
