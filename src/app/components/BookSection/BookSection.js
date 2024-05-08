"use client";

import { useContext, useState } from "react";
import classes from "./BookSection.module.css";
import Button from "../Button/Button";
import BookForm from "../BookForm/BookForm";
import Modal from "../Modal/Modal";
import BookList from "../BookList/BookList";
import { AuthContext } from "@/app/store/auth-context";

function BookSection() {
  const { authorized } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const addNewBookHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (
    <section className={classes["book-section"]}>
      <BookList />
      <Button
        variant="primary"
        onClick={addNewBookHandler}
        disabled={!authorized}
      >
        Add new book
      </Button>
      {modalOpen && (
        <Modal onClose={closeModalHandler}>
          <BookForm />
        </Modal>
      )}
    </section>
  );
}

export default BookSection;
