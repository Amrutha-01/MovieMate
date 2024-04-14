import { User } from "../schemas/userSchema.mjs";
import { Router } from "express";

const router = new Router();

router.post("/favoritesRm", async (req, res) => {
  try {
    const { _id, movieId } = req.body;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    let movieIndex = -1;
    for (let i = 0; i < user.favorites.length; i++) {
      if (user.favorites[i].movieId === movieId) {
        movieIndex = i;
        break;
      }
    }
    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found in Favorites" });
    }
    // user.watchlist.
    user.favorites.splice(movieIndex, 1);
    await user.save();
    res
      .status(200)
      .send({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        watchlist: user.watchlist,
        favorites:user.favorites
      });
  } catch (error) {
    res.status(500).send("Error removing movie to Favorites");
  }
});

export default router;
