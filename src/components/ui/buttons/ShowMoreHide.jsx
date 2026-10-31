import styles from "./ShowMoreHide.module.css";

const ShowMoreHide = ({ handleToggle, more, hide, showAll }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={handleToggle} className={styles.button} type="button">
        {showAll ? hide : more}
        <img
          className={`${styles.arrow} `}
          src={`/icons/${showAll ? "arrow-up" : "arrow"}.svg`}
          alt="arrow"
        />
      </button>
    </div>
  );
};

export default ShowMoreHide;
