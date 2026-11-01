import styles from "./Delivery.module.css";

function Delivery({ orders = [], isHistory = false }) {
  return (
    <section className={styles.delivery}>
      <div className={styles.heading}>
        <span className={styles.subtitle}>PIZZAHOUSE</span>

        <h2>{isHistory ? "📦 Мои заказы" : "🚚 Мои заказы"}</h2>

        <p>
          {isHistory
            ? "История доставленных заказов"
            : "Следи за статусом своих заказов"}
        </p>
      </div>

      {orders.length === 0 ? (
        <div className={styles.empty}>
          <span>🍕</span>
          <h3>Заказов пока нет</h3>
          <p>
            {isHistory
              ? "Здесь появятся доставленные заказы."
              : "Когда оформишь заказ, он появится здесь."}
          </p>
        </div>
      ) : (
        <div className={styles.orders}>
          {orders.map((order) => (
            <article className={styles.order} key={order.id}>
              <div className={styles.orderHeader}>
                <div>
                  <h3>Заказ №{order.id}</h3>

                  <span>
                    {new Date(order.createdAt).toLocaleString("ru-RU")}
                  </span>
                </div>

                <span
                  className={
                    order.delivered ? styles.delivered : styles.processing
                  }
                >
                  {order.delivered
                    ? "✓ Доставлено"
                    : isHistory
                      ? ""
                      : "🚚 В пути"}
                </span>
              </div>

              <div className={styles.items}>
                {order.items.map((item) => (
                  <div className={styles.item} key={item.itemId}>
                    <img src={item.imageUrl} alt={item.title} />

                    <div>
                      <h4>{item.title}</h4>
                      <span>
                        {item.quantity} × {item.price} ₽
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.orderFooter}>
                <span>Итого:</span>
                <strong>{order.totalPrice} ₽</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Delivery;
