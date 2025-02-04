import { putVideoUrl } from "@/utils/awsActions";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import ffmpeg from "@/utils/ffmpeg";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

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

    const encryptionKeyValue = "0123456789abcdef";
    fs.writeFileSync(keyPath, encryptionKeyValue);

    const iv = "1234567890abcdef";

    const keyInfoPath = path.join("/tmp", "key_info.txt");
    const keyInfoContent = `key.key\nfile:${keyPath}\n${iv}`;
    fs.writeFileSync(keyInfoPath, keyInfoContent);

    console.log("key_info.txt content:", keyInfoContent);

    const encryptedPath = path.join("/tmp", `encrypted-${timestamp}.m3u8`);
    const segmentPath = path.join("/tmp", `segment-%03d.ts`);

    if (!fs.existsSync(keyInfoPath)) {
      console.error(`Key info file does not exist at path: ${keyInfoPath}`);
    } else {
      console.log(`Key info file found at path: ${keyInfoPath}`);
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

    const { url } = await putVideoUrl(request);

    await fetch(url!, {
      method: "PUT",
      body: encryptedBuffer,
    });

    fs.rmSync(inputPath, { force: true });
    fs.rmSync(keyPath, { force: true });
    fs.rmSync(keyInfoPath, { force: true });
    fs.rmSync(encryptedPath, { force: true });

    return NextResponse.json(
      {
        message: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/encrypted-video`,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
