import express from "express";

import {
    home, getUserJoin, postUserJoin, getUserLogin,
    postUserLogin, userLogout, startGhLogin, finishGhLogin, watchVideo,
    watchChannel
} from "../controllers/primalController";
import { shouldNotLogInForThisUrl } from "../middleware";

const primalRouter = express.Router();

primalRouter.get("/", home);
primalRouter
    .route("/join")
    .all(shouldNotLogInForThisUrl)
    .get(getUserJoin)
    .post(postUserJoin);

primalRouter
    .route("/login")
    .all(shouldNotLogInForThisUrl)
    .get(getUserLogin)
    .post(postUserLogin);
primalRouter.get("/logout", userLogout);

primalRouter.get("/gh/start", startGhLogin);
primalRouter.get("/gh/finish", finishGhLogin);

primalRouter.get("/watch", watchVideo);

primalRouter.get("/:channelHandle", watchChannel);

export default primalRouter;