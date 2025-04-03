import express from "express";

import {
    getCreateVideo,
    postCreateVideo,
    getWetubeStudio,
    getVideoEdit,
    postVideoEdit,
    deleteVideo,
} from "../controllers/studioController";

import {
    multerVideoErrorHandling,
    shouldLogInForThisUrl,
    videoFileUpload
} from "../middleware";

const studioRouter = express.Router();

studioRouter
    .route("/channel/:channelId[0-9A-Za-z]/videos")
    .all(shouldLogInForThisUrl)
    .get(getWetubeStudio);

studioRouter
    .route("/:channelId[0-9A-Za-z]/videos/upload")
    .all(shouldLogInForThisUrl)
    .get(getCreateVideo)
    .post(
        videoFileUpload.single("videoFileData"),
        postCreateVideo,
        multerVideoErrorHandling
    );

studioRouter
    .route("/:videoId([0-9a-f]{24})/edit")
    .all(shouldLogInForThisUrl)
    .get(getVideoEdit)
    .post(postVideoEdit);

studioRouter
    .route("/:videoId([0-9a-f]{24})/delete")
    .all(shouldLogInForThisUrl)
    .get(deleteVideo);

export default studioRouter;