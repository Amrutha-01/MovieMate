import { User } from "../schemas/userSchema.mjs";
import { Router } from "express";

const router = new Router();

router.post("/favorites", async (req, res) => {
  try {
    const { _id, movieId, type,movieName } = req.body;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found");
    } else if (!type || !movieId || type == "" || movieId == "") {
      return res.status(404).send("Data not sufficient");
    } else {
      user.favorites.push({ type: type, movieId: movieId,movieName:movieName });
      await user.save();
      res
        .status(200)
        .send({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          watchlist: user.watchlist,
          favorites: user.favorites,
        });
    }
  } catch (error) {
    res.status(500).send("Error Adding movie to Favorites");
  }
});


router.get("/favorites", async (req, res) => {
  try {
      const { userId } = req.query; // Assuming the query parameter is userId
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send('User not found');
      } else {
          return res.status(200).send({
              _id: user._id,
              fullName: user.fullName,
              email: user.email,
              favorites: user.favorites
          });
      }
  } catch (error) {
      res.status(500).send('Error fetching user favorites');
  }
});

export default router;
