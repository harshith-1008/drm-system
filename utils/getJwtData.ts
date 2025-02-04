import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/user";
import connectDb from "./connnectDb";

interface TokenDecoded extends JwtPayload {
  id: string;
  email: string;
  fingerprint: string;
}

export const getJwtData = async (request: NextRequest) => {
  await connectDb();
  try {
    const token = request.cookies.get("accessToken")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as TokenDecoded;

    if (
      decodedToken &&
      "id" in decodedToken &&
      "email" in decodedToken &&
      "fingerprint" in decodedToken
    ) {
      const user = await User.findById(decodedToken.id);

      if (!user.fingerprint || user.fingerprint.length === 0) {
        return decodedToken;
      }

      if (user.fingerprint.includes(decodedToken.fingerprint)) {
        return decodedToken;
      }
    }

    throw new Error("Token payload does not match expected format");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid or expired token");
    }
    throw new Error((error as Error).message);
  }
};
