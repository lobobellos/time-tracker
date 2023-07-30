import mongoose from "mongoose";
const config = useRuntimeConfig();
export default async () => {
  try {
    console.log('config url',config.mongoUrl)
    await mongoose.connect(config.mongoUrl);
    console.log("DB connection established.");
  } catch (err) {
    console.error("DB connection failed.", err);
  }
};