import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnection = () => {
  const MONGO_URL = process.env.MONGO_URL;

  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("Error connecting to database", err);
    });
};
