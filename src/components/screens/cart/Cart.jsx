import styles from "./Cart.module.css";

function Cart({ cart, changeQuantity, totalPrice, checkout }) {
  const handleCheckout = async () => {
    try {
      await checkout();
      alert("Заказ успешно оформлен! 🍕");
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      alert("Не удалось оформить заказ");
    }
  };

  return (
    <section className={styles.cart} id="cart">
      <h2>🛒 Корзина</h2>

      {cart.length === 0 ? (
        <div className={styles.empty}>
          <span>🍕</span>
          <p>Корзина пока пустая</p>
          <small>Выбери свою любимую пиццу!</small>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {cart.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.itemInfo}>
                  <img src={item.imageUrl} alt={item.title} />

                  <div>
                    <h3>{item.title}</h3>
                    <span>{item.price} ₽</span>
                  </div>
                </div>

                <div className={styles.quantity}>
                  <button onClick={() => changeQuantity(item.id, -1)}>−</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                </div>

                <strong className={styles.subtotal}>
                  {item.price * item.quantity} ₽
                </strong>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <div>
              <span>Итого:</span>
              <strong>{totalPrice} ₽</strong>
            </div>

            <button onClick={handleCheckout}>Оформить заказ</button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;
