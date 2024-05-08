import dbConnect from "@/app/dbConnect";
import Book from "@/app/api/models/book";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const books = await Book.find();
    return NextResponse.json({ message: "Books fetched!", books });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  const data = await req.json();

  try {
    const book = new Book({
      title: data.title,
      author: data.author,
      genre: data.genre,
      isbn: data.isbn,
    });
    const savedBook = await book.save();
    return NextResponse.json({ message: "Book added!", book: savedBook });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding book", error },
      { status: 500 }
    );
  }
}
