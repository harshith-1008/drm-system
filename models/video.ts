import mongoose, { Schema, Document } from "mongoose";

export interface IVideo extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  bucketLink: string;
  decryptionLink: string;
  adminId: mongoose.Types.ObjectId;
  encrypted: boolean;
}

const videoSchema: Schema<IVideo> = new Schema({
  title: {
    type: String,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
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
  decryptionLink: {
    type: String,
    required: true,
  },
  encrypted: {
    type: Boolean,
    required: true,
  },
});

const Video =
  mongoose.models.Video || mongoose.model<IVideo>("Video", videoSchema);

export default Video;
