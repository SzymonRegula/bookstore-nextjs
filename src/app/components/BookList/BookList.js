import { useContext } from "react";
import Book from "../Book/Book";
import classes from "./BookList.module.css";
import { BooksContext } from "@/app/store/books-context";

function BookList() {
  const { books } = useContext(BooksContext);

  return (
    <ul className={classes.list}>
      {books.map((book) => (
        <li key={book._id}>
          <Book
            id={book._id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            isbn={book.isbn}
          />
        </li>
      ))}
    </ul>
  );
}

export default BookList;
