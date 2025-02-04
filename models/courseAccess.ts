import mongoose, { Schema, Document } from "mongoose";

export interface ICourseAccess extends Document {
  userId: mongoose.Types.ObjectId;
  payment: boolean;
  courseId: mongoose.Types.ObjectId;
}

const courseAccessSchema: Schema<ICourseAccess> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const CourseAccess =
  mongoose.models.CourseAccess ||
  mongoose.model<ICourseAccess>("CourseAccess", courseAccessSchema);
export default CourseAccess;
