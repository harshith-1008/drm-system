import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

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
      return tokenData;
    }

    throw new Error("Token payload does not match expected format");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid or expired token");
    }
    throw new Error((error as Error).message);
  }
};
