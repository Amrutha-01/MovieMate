import { Router } from "express";
import signupRoute from "./signup.mjs";
import loginRoute from "./login.mjs";
import watchlistRoute from "./watchlist.mjs";
import watchlistRouteRm from "./watchlistRm.mjs";
import favoritesRoute from "./favorites.mjs";
import favoritesRouteRm from "./favoritesRm.mjs";
import userData from "./userData.mjs";
import logoutRoute from "./logout.mjs"

const router = Router();

router.use(userData)
router.use(signupRoute);
router.use(loginRoute);
router.use(watchlistRoute)
router.use(watchlistRouteRm);
router.use(favoritesRoute);
router.use(favoritesRouteRm);
router.use(logoutRoute)
export default router;