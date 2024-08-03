import express from "express";

import {
    myVideo, getWetubeStudio, postWetubeStudio, videoEdit, outline,
    reach, participation, audience, videoEditor
} from "../controllers/studioController";

import { shouldLogInForThisUrl } from "../middleware"; 

const studioRouter = express.Router();


studioRouter
    .all(shouldLogInForThisUrl)
    .get("/:channelid[0-9A-Za-z]/videos/upload?filter=", myVideo);
studioRouter
    .route("/channel/:channelid[0-9A-Za-z]")
    .all(shouldLogInForThisUrl)
    .get(getWetubeStudio)
    .post(postWetubeStudio)
studioRouter.get("/video/:videoId/edit", videoEdit);
studioRouter.get("/video/:videoId/analytics/tab-overview/period-default", outline);
studioRouter.get("/video/:videoId/analytics/tab-reach_viewers/period-default", reach);
studioRouter.get("/video/:videoId/analytics/tab-interest_viewers/period-default", participation);
studioRouter.get("/video/:videoId/analytics/tab-build_audience/period-default", audience);
studioRouter.get("/video/:videoId/editor", videoEditor);

export default studioRouter;