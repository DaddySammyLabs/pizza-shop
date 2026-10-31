import styles from "./ShowMore.module.css";
import { useApp } from "@/context/AppContext";

const ShowMore = ({ texts, showMoreImages }) => {
  const { isMobile } = useApp();

  return (
    <>
      <button
        className={`${styles.showMore} ${!isMobile ? styles.desctop : ""}`}
        onClick={showMoreImages}
        type="button"
      >
        {texts.show_more}
      </button>
    </>
  );
};

export default ShowMore;
