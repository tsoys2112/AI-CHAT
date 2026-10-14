import ChatWidget from '../components/chat/ChatWidget.jsx';
import { useTheme } from '../hooks/useTheme.js';
import styles from './DemoPage.module.css';

export default function DemoPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>CloudService</div>
        <nav className={styles.nav} aria-label="Основное меню">
          <a href="#features">Возможности</a>
          <a href="#pricing">Тарифы</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Поддержка клиентов с умным ИИ-агентом
          </h1>
          <p className={styles.lead}>
            Виджет чата в углу экрана — как на популярных сервисах. Ответы 24/7,
            быстрые подсказки и передача сложных вопросов в поддержку.
          </p>
          <p className={styles.hint}>
            Нажмите зелёную кнопку в правом нижнем углу, чтобы открыть демо-чат.
          </p>
        </section>

        <section id="features" className={styles.section}>
          <h2>Возможности</h2>
          <ul className={styles.cards}>
            <li className={styles.card}>
              <h3>Мгновенные ответы</h3>
              <p>ИИ обрабатывает типовые вопросы без очереди.</p>
            </li>
            <li className={styles.card}>
              <h3>Единый стиль</h3>
              <p>Виджет вписывается в дизайн вашего сайта.</p>
            </li>
            <li className={styles.card}>
              <h3>Аналитика</h3>
              <p>История диалогов и оценка качества ответов.</p>
            </li>
          </ul>
        </section>

        <section id="pricing" className={styles.section}>
          <h2>Тарифы</h2>
          <p className={styles.sectionText}>
            Базовый план подходит для старта, расширенный — для команд с
            высокой нагрузкой. Уточните детали в чате с помощником.
          </p>
        </section>

        <section id="contact" className={styles.section}>
          <h2>Контакты</h2>
          <p className={styles.sectionText}>
            demo@example.test · Москва, ул. Примерная, 1
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>© 2026 CloudService — учебное демо</span>
      </footer>

      <ChatWidget theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
