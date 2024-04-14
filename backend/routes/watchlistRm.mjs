// import { User } from "../schemas/userSchema.mjs";
// import { Router } from "express";

// const router = new Router();

// router.post("/watchlistRm", async (req, res) => {
//   try {
//     const { _id, movieId } = req.body;
//     const user = await User.findById(_id);
//     console.log(user)
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     // const movieIndex = user.watchlist.findIndex(
//     //   (id) => id === movieId
//     // );
//     consolelog(user.watchlist[i].movieId)
//     let movieIndex = -1;
//     for (let i = 0; i < user.watchlist.length; i++) {
//       if (user.watchlist[i].movieId === movieId) {
//         movieIndex = i;
//         break;
//       }
//     }
//     if (movieIndex === -1) {
//       return res.status(404).json({ message: "Movie not found in watchlist" });
//     }
//     // user.watchlist.
//     user.watchlist.splice(movieIndex, 1);
//     await user.save();
//     res
//       .status(200)
//       .send({
//         _id: user._id,
//         fullName: user.fullName,
//         email: user.email,
//         watchlist: user.watchlist,
        
//       });
//   } catch (error) {
//     res.status(500).send("Error removing movie to watchlist");
//   }
// });

// export default router;

import { User } from "../schemas/userSchema.mjs";
import { Router } from "express";

const router = new Router();

router.post("/watchlistRm", async (req, res) => {
  try {
    const { _id, movieId ,movieName} = req.body;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let movieIndex = -1;
    for (let i = 0; i < user.watchlist.length; i++) {
      if (user.watchlist[i].movieId === movieId) {
        movieIndex = i;
        break;
      }
    }
    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    user.watchlist.splice(movieIndex, 1);
    await user.save();

    res.status(200).send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      watchlist: user.watchlist,
      favorites: user.favorites, // Include favorites array in the response
    });
  } catch (error) {
    res.status(500).send("Error removing movie from watchlist");
  }
});

export default router;
