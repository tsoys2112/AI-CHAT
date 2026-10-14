import styles from './QuickReplies.module.css';

export default function QuickReplies({ items, onSelect, disabled }) {
  if (!items?.length) return null;

  return (
    <div className={styles.wrap} role="group" aria-label="Быстрые ответы">
      {items.map((text) => (
        <button
          key={text}
          type="button"
          className={styles.chip}
          disabled={disabled}
          onClick={() => onSelect(text)}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
