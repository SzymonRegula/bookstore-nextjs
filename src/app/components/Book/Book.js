import { useContext, useState } from "react";
import { BooksContext } from "@/app/store/books-context";
import { AuthContext } from "@/app/store/auth-context";
import { deleteBook } from "../../services/endpoints/books";
import Button from "../Button/Button";
import classes from "./Book.module.css";
import Modal from "../Modal/Modal";
import BookForm from "../BookForm/BookForm";
import { toast } from "react-toastify";

function Book({ id, title, author, genre, isbn }) {
  const { books, setBooks } = useContext(BooksContext);
  const { authorized } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);

  const notifyDelete = () =>
    toast.info("Book deleted!", { position: "top-center", autoClose: 2000 });

  const editBookHandler = () => {
    setModalOpen(true);
  };
  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const deleteBookHandler = () => {
    if (window.confirm("Do you really want to delete book?")) {
      deleteBook(id)
        .then(() => {
          const updatedBooks = books.filter((book) => book._id !== id);
          setBooks(updatedBooks);
          notifyDelete();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={classes.book}>
      <h2>{title}</h2>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>Genre:</strong> {genre}
      </p>
      <p>
        <strong>ISBN:</strong> {isbn}
      </p>
      <div className={classes.actions}>
        <Button
          variant="secondary"
          onClick={editBookHandler}
          disabled={!authorized}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={deleteBookHandler}
          disabled={!authorized}
        >
          Delete
        </Button>
      </div>
      {modalOpen && (
        <Modal onClose={closeModalHandler}>
          <BookForm id={id} />
        </Modal>
      )}
    </div>
  );
}

export default Book;
