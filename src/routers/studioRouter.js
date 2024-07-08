import express from "express";

import {
    myVideo, youtubeStudio, videoEdit, outline,
    reach, participation, audience, videoEditor
 } from "../controllers/studioController";

const studioRouter = express.Router();

studioRouter.get("/:channelid/videos/upload?filter=", myVideo);
studioRouter.get("/channel/:channelid", youtubeStudio);
studioRouter.get("/video/:videoId/edit", videoEdit);
studioRouter.get("/video/:videoId/analytics/tab-overview/period-default", outline);
studioRouter.get("/video/:videoId/analytics/tab-reach_viewers/period-default", reach);
studioRouter.get("/video/:videoId/analytics/tab-interest_viewers/period-default", participation);
studioRouter.get("/video/:videoId/analytics/tab-build_audience/period-default", audience);
studioRouter.get("/video/:videoId/editor", videoEditor);

export default studioRouter;