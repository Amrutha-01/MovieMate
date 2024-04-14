import bcrypt from "bcrypt";
import { User } from "../schemas/userSchema.mjs";
import { Router } from "express";
import generateToken from "../middleware/generateToken.mjs";

const router = new Router();

router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, password: hashedPassword, email });
    if (user) {
      console.log(user.fullName, user.password);
      await user.save();
    }
    const token = await generateToken(user._id, user.email)
    req.session._id = user._id;
    res.send({ message: "SignUp Successfull", _id: user._id, token: token });
  } catch (error) {
    res.status(500).send(`Error signing up${error}`);
  }
});

export default router;
