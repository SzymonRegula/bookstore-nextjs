import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  isbn: Number,
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default Book;
