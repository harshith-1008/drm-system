import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  price: number;
  adminId: mongoose.Types.ObjectId;
}

const courseSchema: Schema<ICourse> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Course =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);
export default Course;
