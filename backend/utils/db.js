import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error);
  }
};

connectDB.checkConnection = () => {
  return mongoose.connection.readyState === 1; // 1 = connected
};

export default connectDB;
