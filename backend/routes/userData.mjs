import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../schemas/userSchema.mjs";
import asyncHandler from "express-async-handler";

const router = express.Router();

const verifyToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.body.user = await User.findById(decodedToken._id).select("-password");
      console.log("okayy");
      next();
    } catch (err) {
      console.log(err);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

router.get("/userData", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const id = req.body.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);
    res.send({
      _id: user._id,
      fullname: user.fullName,
      email: user.email,
      watchlist: user.watchlist,
      favorites: user.favorites,
    });
    // res.send(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
