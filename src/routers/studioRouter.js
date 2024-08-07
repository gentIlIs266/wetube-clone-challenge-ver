import express from "express";

import {
    myVideo, getCreateVideo, postCreateVideo,
    getWetubeStudio, postWetubeStudio, videoEdit,
    outline, reach, participation, audience,
    videoEditor,
    
} from "../controllers/studioController";

import { multerVideoErrorHandling, shouldLogInForThisUrl, videoFileUpload } from "../middleware"; 

const studioRouter = express.Router();


studioRouter.get("/channel/:channelId[0-9A-Za-z]", getWetubeStudio);
studioRouter
    .all(shouldLogInForThisUrl)
    .route("/:channelId[0-9A-Za-z]/videos/upload")
    .get(getCreateVideo)
    .post(videoFileUpload.single("video"), postCreateVideo, multerVideoErrorHandling);
studioRouter.get("/video/:videoId/edit", videoEdit);
studioRouter.get("/video/:videoId/analytics/tab-overview/period-default", outline);
studioRouter.get("/video/:videoId/analytics/tab-reach_viewers/period-default", reach);
studioRouter.get("/video/:videoId/analytics/tab-interest_viewers/period-default", participation);
studioRouter.get("/video/:videoId/analytics/tab-build_audience/period-default", audience);
studioRouter.get("/video/:videoId/editor", videoEditor);

export default studioRouter;