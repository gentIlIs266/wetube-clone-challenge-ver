import express from "express";

import {
    home,
    getUserJoin,
    postUserJoin,
    getUserLogin,
    postUserLogin,
    userLogout,
    startGhLogin,
    finishGhLogin,
    watchVideo,
    watchChannel,
    getAccountEdit,
    postAccountEdit,
    deleteAccount
} from "../controllers/primalController";
import {
    avatarFileUpload,
    multerAvatarErrorHandling,
    shouldLogInForThisUrl,
    shouldNotLogInForThisUrl
} from "../middleware";

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

primalRouter.get("/logout", shouldLogInForThisUrl, userLogout);

primalRouter.get("/gh/start", shouldNotLogInForThisUrl, startGhLogin);
primalRouter.get("/gh/finish", shouldNotLogInForThisUrl, finishGhLogin);

primalRouter.get("/watch", watchVideo);

primalRouter.get("/results", watchVideo);

primalRouter
    .route("/account_edit")
    .all(shouldLogInForThisUrl)
    .get(getAccountEdit)
    .post(
        avatarFileUpload.single("avatarFileData"),
        postAccountEdit,
        multerAvatarErrorHandling
    );

primalRouter.get("/account/delete", shouldLogInForThisUrl, deleteAccount);

primalRouter.get("/:channelHandle(@[a-zA-Z0-9\uAC00-\uD7A3]+-[a-zA-Z0-9]+)", watchChannel);


export default primalRouter;