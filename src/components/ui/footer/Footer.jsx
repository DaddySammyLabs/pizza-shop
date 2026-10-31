import React from "react";
import { useApp } from "@/context/AppContext";

import styles from "./Footer.module.css";

function Footer({ texts }) {
  const { upButton, scroll, theme, language = "ru" } = useApp();

  return (
    <>
      <hr className={styles.line}></hr>
      <div onClick={upButton} className={styles.footer}>
        {texts.husband_name} & {texts.wife_name}
      </div>
      <div onClick={upButton} className={scroll < 3000 ? "" : styles.upButton}>
        <img src={"/icons/up.svg"} />
      </div>
    </>
  );
}

export default Footer;
