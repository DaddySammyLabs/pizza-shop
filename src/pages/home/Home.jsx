import Hero from "@/components/screens/hero/Hero";
import Categories from "@/components/ui/categories/Categories";
import PizzaCard from "@/components/ui/pizza-card/PizzaCard";

import { useApp } from "@/context/AppContext";

import styles from "@/assets/styles/App.module.css";

function Home() {
  const {
    activeCategory,
    setActiveCategory,
    filteredPizzas,
    loading,
    error,
    addToCart,
  } = useApp();

  if (loading) return <h2>Загрузка пицц...</h2>;

  if (error) return <h2>Ошибка загрузки: {error}</h2>;

  return (
    <>
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
      </main>
    </>
  );
}

export default Home;
