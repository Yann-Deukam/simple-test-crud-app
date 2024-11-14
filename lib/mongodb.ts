import mongoose from "mongoose";

const connectMongodb = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.error("MONGODB_URI is not defined in the environment variables.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongodb;
