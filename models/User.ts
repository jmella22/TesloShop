import mongoose, { model, Model, Schema } from "mongoose";
import { IUser } from "../interface";

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: " no es un rol valido",
        default: "client",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;
