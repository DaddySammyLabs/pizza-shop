import styles from "./Header.module.css";

function Header({ cartCount }) {
  return (
    <header className={styles.header}>
      <a href="#" className={styles.logo}>
        🍕 Pizza<span>House</span>
      </a>

      <nav className={styles.navigation}>
        <a href="#menu">Меню</a>
        <a href="#about">О нас</a>
        <a href="#delivery">Доставка</a>
      </nav>

      <a href="#cart" className={styles.cartButton}>
        <span>🛒</span>
        Корзина
        <span className={styles.cartCount}>{cartCount}</span>
      </a>
    </header>
  );
}

export default Header;
