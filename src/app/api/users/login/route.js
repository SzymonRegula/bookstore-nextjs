import dbConnect from "@/app/dbConnect";
import User from "@/app/api/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await dbConnect();

  const data = await req.json();

  try {
    const user = await User.findOne({ login: data.login });
    if (!user) {
      return NextResponse.json({
        message: "Incorrect login or password!",
        status: 401,
      });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          message: "Incorrect login or password!",
        },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { login: user.login, userId: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({ message: "Auth successful!", token });
  } catch (error) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}
