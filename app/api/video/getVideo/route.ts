import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/utils/connnectDb";
import Video from "@/models/video";

export const POST = async (request: NextRequest) => {
  try {
    await connectDb();

    const req = await request.json();
    const { videoId } = req;
    console.log(videoId);
    if (!videoId) {
      return NextResponse.json(
        { message: "Video ID is required" },
        { status: 400 }
      );
    }

    const video = await Video.findById(videoId);
    console.log(video);
    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Video fetched successfully",
        data: video,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching video:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
