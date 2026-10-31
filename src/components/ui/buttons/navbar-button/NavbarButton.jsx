import styles from "./NavbarButton.module.css";
import { useApp } from "@/context/AppContext";

const NavbarButton = () => {
  const { theme, openNavbar } = useApp();
  return (
    <>
      <span type="button" className={styles.menu} onClick={openNavbar}>
        <img
          src={theme === "light" ? "/icons/bars_dark.svg" : "/icons/bars.svg"}
          alt="menu-navbar"
        />
      </span>
    </>
  );
};

export default NavbarButton;
