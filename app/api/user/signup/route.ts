import connectDb from "@/utils/connnectDb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const req = await request.json();
    const { email, password } = req;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    if (newUser) {
      return NextResponse.json(
        { message: "User created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
