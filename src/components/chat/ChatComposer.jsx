import { useCallback, useState } from 'react';
import { useSpeechInput } from '../../hooks/useSpeechInput.js';
import styles from './ChatComposer.module.css';

export default function ChatComposer({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const appendSpeech = useCallback((text) => {
    setValue((prev) => (prev.trim() ? `${prev.trimEnd()} ${text}` : text));
  }, []);
  const { supported, isListening, interim, error, toggle, stop } = useSpeechInput({
    onResult: appendSpeech,
  });

  const submit = useCallback(() => {
    if (!value.trim() || disabled) return;
    stop();
    onSend(value);
    setValue('');
  }, [value, disabled, onSend, stop]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const shownValue =
    isListening && interim ? `${value}${value ? ' ' : ''}${interim}` : value;

  return (
    <div className={styles.wrap}>
      {error || isListening ? (
        <div className={styles.status} role="status">
          {error || (interim ? `Слушаю: ${interim}` : 'Слушаю… говорите')}
        </div>
      ) : null}
      <div className={styles.composer}>
        <textarea
          className={styles.input}
          rows={1}
          placeholder="Напишите сообщение…"
          value={shownValue}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Текст сообщения"
        />
        {supported ? (
          <button
            type="button"
            className={`${styles.mic} ${isListening ? styles.micActive : ''}`}
            onClick={toggle}
            disabled={disabled}
            aria-pressed={isListening}
            aria-label={isListening ? 'Остановить голосовой ввод' : 'Голосовой ввод'}
            title={isListening ? 'Остановить' : 'Голосовой ввод'}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11z"
              />
            </svg>
          </button>
        ) : null}
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
    </div>
  );
}
