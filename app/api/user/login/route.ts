import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import connectDb from "@/utils/connnectDb";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const req = await request.json();

    const { email, password, deviceFingerprint } = req;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User not registered." },
        { status: 400 }
      );
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Wrong password." }, { status: 400 });
    }

    if (user.fingerprints.length >= 2) {
      return NextResponse.json(
        {
          message: "Device limit reached",
          userId: user._id,
          fingerprints: user.fingerprints,
        },
        { status: 401 }
      );
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not defined");
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      fingerprint: deviceFingerprint,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

    const response = NextResponse.json(
      { message: token }, //"User logged in successfully."
      { status: 200 }
    );

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 3,
    });

    if (!user.fingerprints.includes(deviceFingerprint)) {
      user.fingerprints.push(deviceFingerprint);
      await user.save();
    }

    return response;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
