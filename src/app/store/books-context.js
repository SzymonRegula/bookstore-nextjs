"use client";

import { createContext, useEffect, useState } from "react";
import { getBooks } from "../services/endpoints/books";

export const BooksContext = createContext({});

export default function BooksContextProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
}
