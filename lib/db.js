import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Database connected");
    });

    connection.on("error", () => {
      console.log("Mongodb connection error");
      process.exit();
    });
  } catch (error) {
    console.error(`Database connection failed ${error}`);
  }
}
