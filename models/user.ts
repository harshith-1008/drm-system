import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  fingerprint1?: string;
  fingerprint2?: string;
  role: "admin" | "user";
  accessToken?: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fingerprint1: { type: String },
    fingerprint2: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
