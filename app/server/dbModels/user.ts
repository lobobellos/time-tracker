import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    pin: { type: Number, unique: true, required:true },
    name: { type: String, unique: true, required:true},
    title: { type: String, required:true },
    roomTimes:{type: [[Number]], required:true},
    bio: { type: String },
  },
  { timestamps: true, strict: true, strictQuery: true }
);
export default mongoose.model("User", schema, "user");