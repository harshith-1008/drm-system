import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  fingerprints?: [string, string];
  role: "admin" | "user";
  accessToken?: string;
  password: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fingerprints: {
      type: [String, String],
    },
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
