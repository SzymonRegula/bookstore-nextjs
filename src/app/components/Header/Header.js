import AuthForm from "../AuthForm/AuthForm";
import classes from "./Header.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  return (
    <header className={classes.header}>
      <h1>Bookstore</h1>
      <ToastContainer />
      <AuthForm />
    </header>
  );
}

export default Header;
