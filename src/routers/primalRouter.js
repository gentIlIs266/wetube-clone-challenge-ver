import express from "express";

const primalRouter = express.Router();

primalRouter.get("/", home);
primalRouter.get("/join", userJoin);
primalRouter.get("/login", userLogin);

primalRouter.get("/gaming", game);
primalRouter.get("/podcasts", podcast);
primalRouter.get("/premium", youtubePremium);
primalRouter.get("/musicPremium", youtubeMusic);
primalRouter.get("/kids", youtubeKids);
primalRouter.get("/watch?:videoid", watchVideo); //videos/watch
primalRouter.get("/playlist?list=WL", watchLater);
primalRouter.get("/playlist?list=LL", likeVideo);

primalRouter.get("/shorts/:shortsid", watchShorts);

primalRouter.get("/account", account);
primalRouter.get("/account_notifications", accountNotification);
primalRouter.get("/account_playback", accountPlayback);
primalRouter.get("/account_privacy", accountPrivacy);
primalRouter.get("/account_sharing", accountSharing);
primalRouter.get("/account_billing", accountBilling);
primalRouter.get("/account_advanced", accountAdvanced);
export default primalRouter;