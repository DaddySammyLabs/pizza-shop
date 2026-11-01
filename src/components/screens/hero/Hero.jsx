import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <span className={styles.label}>🔥 Горячая и вкусная пицца</span>

        <h1>
          Пицца, которая
          <br />
          делает день <span>лучше!</span>
        </h1>

        <p>
          Готовим из свежих ингредиентов. Доставляем горячей прямо к твоей
          двери.
        </p>

        <a href="#menu" className={styles.button}>
          Выбрать пиццу →
        </a>
      </div>
    </section>
  );
}

export default Hero;
