import styles from "./Categories.module.css";

function Categories({ activeCategory, setActiveCategory }) {
  const categories = ["Все", "Мясные", "Сырные", "Вегетарианские"];

  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={
            activeCategory === category ? styles.active : styles.categoryButton
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
