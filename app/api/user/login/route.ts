import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import connectDb from "@/utils/connnectDb";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const req = await request.json();
    const { email, password } = req;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not registered." },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcryptjs.compare(password, user.Password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong password." }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user._email,
    };

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);
    const response = NextResponse.json(
      { message: "User logged in successfully." },
      { status: 200 }
    );

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    });

    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
