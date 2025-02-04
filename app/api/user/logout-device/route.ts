import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import connectDb from "@/utils/connnectDb";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();
    const req = await request.json();
    const { userId, deviceToDelete } = req;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.fingerprints = user.fingerprints.filter(
      (fingerprint: string) => fingerprint !== deviceToDelete
    );

    await user.save();

    return NextResponse.json({
      message: "Device logged out successfully",
      status: 200,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
