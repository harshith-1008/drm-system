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
    const keyInfoContent = `http://localhost:3000/api/get-keys\nfile:${keyPath}\n${iv}`;
    fs.writeFileSync(keyInfoPath, keyInfoContent);

    const encryptedPath = path.join("/tmp", `encrypted-${timestamp}.m3u8`);
    const segmentPath = path.join("/tmp", `segment-%03d.ts`);

    if (!fs.existsSync(keyInfoPath)) {
      return NextResponse.json(
        { error: "Key info file does not exist at path." },
        { status: 400 }
      );
    }

    const WatermarkText = "Hello";
    const generateRandomKey = () => crypto.randomUUID();
    const key2 = generateRandomKey();
    await new Promise<void>((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions("-c:v libx264")
        .outputOptions("-preset ultrafast")
        .outputOptions(
          `-vf drawtext=text='${WatermarkText.replace(
            /'/g,
            "\\'"
          )}':fontfile='/System/Library/Fonts/HelveticaNeue.ttc':fontcolor=white:fontsize=24:x=10:y=10`
        )
        .outputOptions("-f hls")
        .outputOptions("-hls_time 10")
        .outputOptions("-hls_list_size 0")
        .outputOptions(`-hls_key_info_file ${keyInfoPath}`)
        .outputOptions(`-hls_segment_filename ${segmentPath}`)
        .output(encryptedPath)
        .on("stderr", (line) => console.log("stderr:", line))
        .on("end", () => resolve())
        .on("error", (err) => reject(err))
        .run();
    });

    // Upload .ts files
    const tsFiles = fs
      .readdirSync("/tmp")
      .filter((file) => file.startsWith("segment-") && file.endsWith(".ts"));
    console.log("TS Files Found:", tsFiles);
    for (const tsFile of tsFiles) {
      const tsBuffer = fs.readFileSync(path.join("/tmp", tsFile));
      const { url } = await putVideoUrl("ts", key2, tsFile);
      await fetch(url!, {
        method: "PUT",
        body: tsBuffer,
      });
    }

    const encryptedBuffer = fs.readFileSync(encryptedPath);
    const { url } = await putVideoUrl("playlist", key2);

    await fetch(url!, {
      method: "PUT",
      body: encryptedBuffer,
    });

    const newVideo = await Video.create({
      title: title,
      adminId: user.id,
      bucketLink: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${key2}/playlist`,
      decryptionCode: encryptionKeyValue,
      iv: iv,
    });

    // Clean up
    fs.rmSync(inputPath, { force: true });
    fs.rmSync(keyPath, { force: true });
    fs.rmSync(keyInfoPath, { force: true });
    fs.rmSync(encryptedPath, { force: true });
    tsFiles.forEach((file) =>
      fs.rmSync(path.join("/tmp", file), { force: true })
    );

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
