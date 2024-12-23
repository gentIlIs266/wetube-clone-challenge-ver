import express from "express";

import {
    home, getUserJoin, postUserJoin, getUserLogin,
    postUserLogin, userLogout, startGhLogin, finishGhLogin,
    game, podcast, youtubePremium, youtubeMusic, youtubeKids,
    watchLater, likeVideo, watchVideo, watchShorts,
    account, accountNotification, accountPlayback,
    accountPrivacy, accountSharing, accountBilling,
    accountAdvanced, catchServerContact
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

primalRouter.get("/gaming", game);
primalRouter.get("/podcasts", podcast);
primalRouter.get("/premium", youtubePremium);
primalRouter.get("/musicPremium", youtubeMusic);
primalRouter.get("/kids", youtubeKids);

primalRouter.get("/playlist?list=WL", watchLater);
primalRouter.get("/playlist?list=LL", likeVideo);

primalRouter.get("/watch", watchVideo); //videos/watch
primalRouter.get("/shorts/:shortsId", watchShorts);

primalRouter.get("/account", account);
primalRouter.get("/account_notifications", accountNotification);
primalRouter.get("/account_playback", accountPlayback);
primalRouter.get("/account_privacy", accountPrivacy);
primalRouter.get("/account_sharing", accountSharing);
primalRouter.get("/account_billing", accountBilling);
primalRouter.get("/account_advanced", accountAdvanced);

primalRouter.post("/servercontact", catchServerContact);

export default primalRouter;