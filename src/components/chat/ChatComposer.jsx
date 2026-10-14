import { useCallback, useState } from 'react';
import styles from './ChatComposer.module.css';

export default function ChatComposer({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const submit = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
  }, [value, disabled, onSend]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className={styles.composer}>
      <textarea
        className={styles.input}
        rows={1}
        placeholder="Напишите сообщение…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label="Текст сообщения"
      />
      <button
        type="button"
        className={styles.send}
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Отправить"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"
          />
        </svg>
      </button>
    </div>
  );
}
