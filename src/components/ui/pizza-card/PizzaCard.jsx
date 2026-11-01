import styles from "./PizzaCard.module.css";

function PizzaCard({ pizza, addToCart }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* <img src={pizza.image} alt={pizza.name} className={styles.image} /> */}
        <img src={pizza.imageUrl} alt={pizza.name} className={styles.image} />

        {pizza.popular && <span className={styles.badge}>🔥 Популярная</span>}
      </div>

      <div className={styles.info}>
        {/* <h3>{pizza.name}</h3> */}
        <h3>{pizza.title}</h3>

        <p className={styles.description}>{pizza.description}</p>

        <div className={styles.footer}>
          <strong className={styles.price}>{pizza.price} ₽</strong>

          <button className={styles.addButton} onClick={() => addToCart(pizza)}>
            + Добавить
          </button>
        </div>
      </div>
    </article>
  );
}

export default PizzaCard;
