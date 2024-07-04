import express from "express";

const studioRouter = express.Router();

studioRouter.get("/channel/:channelId");
studioRouter.get("/video/:videoId");

export default studioRouter;