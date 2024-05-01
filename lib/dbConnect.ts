import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) throw new Error("DB URI Missing");
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    isConnected = true;
    console.log("MongoDB is connected!");
  } catch (err) {
    console.error("Connection Failed", err);
  }
};

export default connectDB;