import dbConnect from "@/app/dbConnect";
import Book from "@/app/api/models/book";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  await dbConnect();

  const { id } = params;

  const data = await req.json();

  try {
    const book = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      isbn: data.isbn,
    };
    const updatedBook = await Book.findByIdAndUpdate(id, book, {
      new: true,
    });
    if (!updatedBook) {
      return NextResponse.json(
        { message: `Book ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: `Book ${id} updated!`,
      book: updatedBook,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating book", error },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return NextResponse.json(
        { message: `Book ${id} not found` },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: `Book ${id} deleted!` });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting book", error },
      { status: 500 }
    );
  }
}
