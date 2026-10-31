import styles from "./LangSwitcher.module.css";

const ButtonLangSwitcher = ({ theme, open }) => {
  return (
    <>
      <span type="button" className={styles.menu} onClick={open}>
        <img
          src={theme === "light" ? "/icons/bars_dark.svg" : "/icons/bars.svg"}
          alt="menu-navbar"
        />
      </span>
    </>
  );
};

export default ButtonLangSwitcher;

// if(separate: hook & components) {
//   useModalMenu.js
//
//   components 2x in one.jsx
//   export function ButtonLangSwitcher;
//   export function ModalMenu;
// }
