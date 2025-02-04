import { putVideoUrl } from "@/utils/awsActions";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import ffmpeg from "@/utils/ffmpeg";
import Video from "@/models/video";
import bcryptjs from "bcryptjs";
import { getJwtData } from "@/utils/getJwtData";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const file = formData.get("file") as File | null;
    const user = await getJwtData(request);

    if (!user) {
      return NextResponse.json(
        { error: "User not registered." },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "No file found." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const inputPath = path.join("/tmp", `input-${Date.now()}.mp4`);
    fs.writeFileSync(inputPath, buffer);

    const timestamp = Date.now();
    const encryptionKey = `encryption-key-${timestamp}.key`;
    const keyPath = path.join("/tmp", encryptionKey);

    const encryptionKeyValue = process.env.ENCRYPTION_KEY_VALUE;
    const salt = await bcryptjs.genSalt(10);
    let hashedEncryptionKey;
    if (encryptionKeyValue) {
      fs.writeFileSync(keyPath, encryptionKeyValue);
      hashedEncryptionKey = await bcryptjs.hash(encryptionKeyValue, salt);
    }
    const iv = process.env.IV;

    const keyInfoPath = path.join("/tmp", "key_info.txt");
    const keyInfoContent = `key.key\nfile:${keyPath}\n${iv}`;
    fs.writeFileSync(keyInfoPath, keyInfoContent);

    const encryptedPath = path.join("/tmp", `encrypted-${timestamp}.m3u8`);
    const segmentPath = path.join("/tmp", `segment-%03d.ts`);

    if (!fs.existsSync(keyInfoPath)) {
      return NextResponse.json(
        { error: "Key info file does not exist at path." },
        { status: 400 }
      );
    }

    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions("-c:v libx264")
        .outputOptions("-preset ultrafast")
        .outputOptions("-f hls")
        .outputOptions("-hls_time 10")
        .outputOptions("-hls_list_size 0")
        .outputOptions(`-hls_key_info_file ${keyInfoPath}`)
        .outputOptions(`-hls_segment_filename ${segmentPath}`)
        .output(encryptedPath)
        .on("end", () => resolve())
        .on("error", (err) => reject(err))
        .run();
    });

    const encryptedBuffer = fs.readFileSync(encryptedPath);

    const { url, key } = await putVideoUrl();

    await fetch(url!, {
      method: "PUT",
      body: encryptedBuffer,
    });

    let hashedIV;
    if (iv) {
      hashedIV = await bcryptjs.hash(iv, salt);
    }
    const newVideo = await Video.create({
      title: title,
      adminId: user.id,
      bucketLink: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
      decryptionCode: hashedEncryptionKey,
      iv: hashedIV,
    });

    fs.rmSync(inputPath, { force: true });
    fs.rmSync(keyPath, { force: true });
    fs.rmSync(keyInfoPath, { force: true });
    fs.rmSync(encryptedPath, { force: true });

    return NextResponse.json(
      {
        message: "Video created successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
