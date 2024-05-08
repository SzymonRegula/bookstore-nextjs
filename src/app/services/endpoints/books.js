import api from "../api";

const headers = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const getBooks = () => {
  return api.get("/books");
};

export const addBook = (bookData) => {
  return api.post(`/books`, bookData, { headers: headers() });
};

export const deleteBook = (bookId) => {
  return api.delete(`/books/${bookId}`, { headers: headers() });
};

export const updateBook = (bookId, bookData) => {
  return api.put(`/books/${bookId}`, bookData, { headers: headers() });
};
