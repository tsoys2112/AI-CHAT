import ChatWidget from '../components/chat/ChatWidget.jsx';
import { PRODUCTS } from '../mocks/products.mock.js';
import { useTheme } from '../hooks/useTheme.js';
import styles from './DemoPage.module.css';

export default function DemoPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>СолнцеДом</div>
        <nav className={styles.nav} aria-label="Основное меню">
          <a href="#features">Каталог</a>
          <a href="#pricing">Доставка и гарантия</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            Солнечная энергетика для дома и дачи
          </h1>
          <p className={styles.lead}>
            Панели, инверторы, аккумуляторы и готовые комплекты. ИИ-консультант
            подберёт оборудование под вашу нагрузку и ответит на вопросы по товарам.
          </p>
          <p className={styles.hint}>
            Нажмите зелёную кнопку в правом нижнем углу, чтобы задать вопрос консультанту.
          </p>
        </section>

        <section id="features" className={styles.section}>
          <h2>Каталог</h2>
          <ul className={styles.cards}>
            {PRODUCTS.slice(0, 6).map((p) => (
              <li key={p.id} className={styles.card}>
                <h3>{p.name}</h3>
                <p>
                  {p.price.toLocaleString('ru-RU')} ₽ · {p.stock}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="pricing" className={styles.section}>
          <h2>Доставка и гарантия</h2>
          <p className={styles.sectionText}>
            Доставка по России за 2–7 дней, от 50 000 ₽ бесплатно. Гарантия на
            панели — 12 лет, на инверторы и аккумуляторы — 10 лет.
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
        <span>© 2026 СолнцеДом — учебное демо</span>
      </footer>

      <ChatWidget theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
