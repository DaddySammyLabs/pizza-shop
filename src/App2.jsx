import Header from "@/components/screens/header/Header";
import Hero from "@/components/screens/hero/Hero";
import Categories from "@/components/ui/categories/Categories";
import PizzaCard from "@/components/ui/pizza-card/PizzaCard";
import Cart from "@/components/screens/cart/Cart";

import { useApp } from "./context/AppContext";

import styles from "@/assets/styles/App.module.css";

function App() {
  const {
    activeCategory,
    setActiveCategory,
    filteredPizzas,
    loading,
    error,

    cart,
    cartCount,
    totalPrice,
    addToCart,
    changeQuantity,
  } = useApp();

  if (loading) return <h2>Загрузка пицц...</h2>;

  if (error) return <h2>Ошибка загрузки: {error}</h2>;

  return (
    <div className={styles.app}>
      <Header cartCount={cartCount} />

      <Hero />

      <main className={styles.container} id="menu">
        <section className={styles.menu}>
          <div className={styles.heading}>
            <div>
              <h2>Наше меню</h2>
              <p>Выбирай свою любимую пиццу 🍕</p>
            </div>
          </div>

          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <div className={styles.pizzaGrid}>
            {filteredPizzas.map((pizza) => (
              <PizzaCard key={pizza.id} pizza={pizza} addToCart={addToCart} />
            ))}
          </div>
        </section>

        <Cart
          cart={cart}
          totalPrice={totalPrice}
          changeQuantity={changeQuantity}
        />
      </main>

      <footer className={styles.footer} id="about">
        <h2>🍕 PizzaHouse</h2>
        <p>Вкусная пицца — счастливые моменты.</p>
        <span>© 2026 PizzaHouse</span>
      </footer>
    </div>
  );
}

export default App;
