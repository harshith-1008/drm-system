import Course from "@/models/course";
import { getJwtData } from "@/utils/getJwtData";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const req = await request.json();
  const { name, description, price } = req;

  const user = await getJwtData(request);

  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 400 });
  }

  if (!name || !description || price) {
    return NextResponse.json(
      { message: "All details not mentioned." },
      { status: 400 }
    );
  }

  const newCourse = await Course.create({
    name: name,
    description: description,
    price: price,
    adminId: user.id,
  });

  return NextResponse.json(
    { message: "Course successfully created" },
    { status: 200 }
  );
};
