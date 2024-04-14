import { Router } from "express";

const router = Router();

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });

  res.json({ message: "Logout successful" });
});

export default router;
