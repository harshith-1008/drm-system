import { NextRequest, NextResponse } from "next/server";
import { getJwtData } from "./getJwtData";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getVideoUrl(request: NextRequest) {
  const generateRandomKey = () => crypto.randomUUID();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: generateRandomKey(),
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return { url: signedUrl };
}
