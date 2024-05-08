import { useEffect } from "react";
import classes from "./Modal.module.css";

function Modal({ children, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={classes.modal}>
      <div className={classes.overlay} onClick={onClose}></div>
      <div className={classes.body}>{children}</div>
    </div>
  );
}

export default Modal;
