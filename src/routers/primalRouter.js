import express from "express";

import {
    home, getUserJoin, postUserJoin, getUserLogin,
    postUserLogin, userLogout, startGhLogin, finishGhLogin, watchVideo,
    watchChannel,
    getAccountEdit,
    postAccountEdit
} from "../controllers/primalController";
import { shouldLogInForThisUrl, shouldNotLogInForThisUrl } from "../middleware";

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

primalRouter
    .route("/account_edit")
    .all(shouldLogInForThisUrl)
    .get(getAccountEdit)
    .post(postAccountEdit);

primalRouter.get("/:channelHandle(@[a-zA-Z0-9\uAC00-\uD7A3]+-[a-zA-Z0-9]+)", watchChannel);


export default primalRouter;