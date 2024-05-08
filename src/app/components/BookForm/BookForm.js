import { useContext } from "react";
import { addBook, updateBook } from "../../services/endpoints/books";
import Button from "../Button/Button";
import classes from "./BookForm.module.css";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { BooksContext } from "@/app/store/books-context";

function BookForm({ id = null }) {
  const { books, setBooks } = useContext(BooksContext);
  const book = id ? books.find((book) => book._id === id) : null;

  const notifyAdd = () =>
    toast.info("Book added!", { position: "top-center", autoClose: 2000 });
  const notifyEdit = () =>
    toast.info("Book updated!", { position: "top-center", autoClose: 2000 });

  const initialValues = {
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    isbn: book?.isbn || "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.author) {
      errors.author = "Required";
    }

    if (!values.genre) {
      errors.genre = "Required";
    }

    if (!values.isbn) {
      errors.isbn = "Required";
    } else if (!/^(\d{10}|\d{13})$/.test(values.isbn)) {
      errors.isbn = "ISBN must be a 10 or 13 digit number";
    }

    return errors;
  };

  const submitHandler = (values) => {
    if (id) {
      updateBook(id, values)
        .then((response) => {
          const newBook = response.data.book;
          setBooks((prevBooks) =>
            prevBooks.map((prevBook) =>
              prevBook._id === newBook._id ? newBook : prevBook
            )
          );
          notifyEdit();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      addBook(values)
        .then((response) => {
          setBooks((prevBooks) => prevBooks.concat(response.data.book));
          notifyAdd();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={submitHandler}
    >
      <Form className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage
            name="title"
            component="div"
            className={classes.errorMessage}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="author">Author</label>
          <Field type="text" id="author" name="author" />
          <ErrorMessage
            name="author"
            component="div"
            className={classes.errorMessage}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="genre">Genre</label>
          <Field type="text" id="genre" name="genre" />
          <ErrorMessage
            name="genre"
            component="div"
            className={classes.errorMessage}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="isbn">ISBN</label>
          <Field type="number" step={1} id="isbn" name="isbn" />
          <ErrorMessage
            name="isbn"
            component="div"
            className={classes.errorMessage}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit">{id ? `Update book` : `Add book`}</Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default BookForm;
