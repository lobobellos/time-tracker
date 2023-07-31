import mongoose from "mongoose";
const { mongoUrl } = useRuntimeConfig();
export default async () => {
  try {
    console.log('config url', mongoUrl)
    await mongoose.connect(mongoUrl);
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};