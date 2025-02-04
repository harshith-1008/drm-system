import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  courseId?: mongoose.Types.ObjectId;
  title: string;
  bucketLink: string;
  decryptionCode: string;
  adminId: mongoose.Types.ObjectId;
  encrypted: boolean;
  iv: String;
}

const videoSchema: Schema<IVideo> = new Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bucketLink: {
    type: String,
    required: true,
  },
  decryptionCode: {
    type: String,
    required: true,
  },
  iv: {
    type: String,
    required: true,
  },
});

const Video =
  mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
