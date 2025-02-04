import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/user";

interface TokenDecoded extends JwtPayload {
  id: string;
  email: string;
  fingerprint: string;
}

export const getJwtData = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("accessToken")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;

    if (
      typeof decodedToken === "object" &&
      decodedToken &&
      "id" in decodedToken &&
      "email" in decodedToken &&
      "fingerprint" in decodedToken
    ) {
      const tokenData = decodedToken as TokenDecoded;
      const user = await User.findById(decodedToken.id);
      if (user && user.fingerprint.includes(decodedToken.fingerprint)) {
        return tokenData;
      } else {
        const response = NextResponse.redirect("/login");
        response.cookies.delete("accessToken");
        return response;
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
