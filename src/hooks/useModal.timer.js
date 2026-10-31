//   src//hooks/useModal.js
// isVisible -> for setTimeout(500ms) for animation

import { useState, useCallback, useEffect } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        close();
      }
    },
    [close],
  );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);

      document.addEventListener("keydown", handleKeyDown);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // if (!isVisible) return null;

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useModal;

// toUse: 1-import, 2-cont, 3-comp, 4-pros

// 1-import texts + useModal + ModalWindow
// import useModal from "../hooks/useModal";
// import ModalWindow from "../components/ModalWindow";

// 2-set-variable
// const { isOpen, open, close } = useModal();

// 3-use-in-component
// <>
//     <button onClick={open} className="header-button" type="button">
//         {texts.contact}
//     </button>

//     <ModalWindow show={isOpen} onClose={close} texts={texts} />

//     <ModalWindow show={isOpen} onClose={close} texts={texts}>
//       <div className="modal-window">
//         <h2 className="modal-title">{texts.modalTitle}</h2>
//         <p className="modal-text">{texts.modalText}</p>
//       </div>
//     </ModalWindow>
// </>;
