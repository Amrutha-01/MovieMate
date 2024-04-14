import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  watchlist: { type: mongoose.Schema.Types.Array },
  favorites: { type: mongoose.Schema.Types.Array },
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY);
  return token;
};

export const User = mongoose.model("User", userSchema);
