import agentAvatar from '../../assets/images.jpg';
import styles from './SupportAgentAvatar.module.css';

/**
 * Аватар ИИ-агента (FAB, шапка, сообщения).
 */
export default function SupportAgentAvatar({ className = '', size = 'md' }) {
  return (
    <img
      className={`${styles.img} ${styles[size]} ${className}`.trim()}
      src={agentAvatar}
      alt=""
      aria-hidden="true"
      draggable={false}
    />
  );
}
