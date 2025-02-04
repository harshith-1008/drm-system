import { getVideoUrl } from "@/utils/awsActions";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (request: NextRequest) => {
  try {
    const { url } = await getVideoUrl(request);
    console.log(url);
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file found." }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fetch(url!, {
      method: "PUT",
      body: buffer,
      headers: {
        "Content-Type": file.type,
      },
    });

    return NextResponse.json(
      {
        message: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/test-file`,
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occured.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
};
