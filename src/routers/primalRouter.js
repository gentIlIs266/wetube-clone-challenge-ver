import express from "express";

import {
    home, getUserJoin, postUserJoin, getUserLogin,
    postUserLogin, userLogout, game, podcast,
    youtubePremium, youtubeMusic, youtubeKids,
    watchLater, likeVideo, watchVideo, watchShorts,
    account, accountNotification, accountPlayback,
    accountPrivacy, accountSharing, accountBilling,
    accountAdvanced
} from "../controllers/primalController";

const primalRouter = express.Router();

primalRouter.get("/", home);
primalRouter.route("/join").get(getUserJoin).post(postUserJoin);
primalRouter.route("/login").get(getUserLogin).post(postUserLogin);
primalRouter.get("/logout", userLogout);

primalRouter.get("/gaming", game);
primalRouter.get("/podcasts", podcast);
primalRouter.get("/premium", youtubePremium);
primalRouter.get("/musicPremium", youtubeMusic);
primalRouter.get("/kids", youtubeKids);

primalRouter.get("/playlist?list=WL", watchLater);
primalRouter.get("/playlist?list=LL", likeVideo);

primalRouter.get("/watch/?v=:videoId", watchVideo); //videos/watch
primalRouter.get("/shorts/:shortsId", watchShorts);

primalRouter.get("/account", account);
primalRouter.get("/account_notifications", accountNotification);
primalRouter.get("/account_playback", accountPlayback);
primalRouter.get("/account_privacy", accountPrivacy);
primalRouter.get("/account_sharing", accountSharing);
primalRouter.get("/account_billing", accountBilling);
primalRouter.get("/account_advanced", accountAdvanced);

export default primalRouter;