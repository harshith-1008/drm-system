import { NextRequest, NextResponse } from "next/server";
import { getJwtData } from "./getJwtData";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function putVideoUrl(
  type: string,
  key: string,
  segmentName?: string
) {
  if (type === "playlist") {
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${key}/playlist`,
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });

    return { url: signedUrl, key: key };
  }
  if (type === "ts") {
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${key}/${segmentName}`,
      ContentType: "video/MP2T",
    });

    const signedUrl = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });

    return { url: signedUrl };
  }
}

export async function getVideoUrl(request: NextRequest) {
  const downloadCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "encrypted-video",
  });

  // const data = await s3.send(downloadCommand)
  // const encryptedBuffer = await streamToBuffer
}
