import bcrypt from "bcrypt";
import { User } from "../schemas/userSchema.mjs";
import { Router } from "express";
import generateToken from "../middleware/generateToken.mjs";

const router = new Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      req.session._id = user._id;
      res.send({
        message: "Login successfull",
        token: await generateToken(user._id, user.email),
        _id: user._id,
      });
    } else {
      res.status(400).send({ message: "Invalid password" });
    }
  } else {
    res.status(400).send({ message: "User not found" });
  }
});

export default router;
