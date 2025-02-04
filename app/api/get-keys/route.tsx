import { getJwtData } from "@/utils/getJwtData";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const user = await getJwtData(request);

    if (!user) {
      return new NextResponse("User not logged in", { status: 400 });
    }

    const encryptionKey = process.env.ENCRYPTION_KEY_VALUE;
    const iv = process.env.IV;

    if (!encryptionKey || !iv) {
      return new NextResponse("Encryption key or IV not found", {
        status: 500,
      });
    }

    return new NextResponse(encryptionKey, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "X-IV": iv,
      },
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
