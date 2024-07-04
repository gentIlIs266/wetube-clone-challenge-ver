import express from "express";

const channelIdRouter = express.Router();

channelIdRouter.get("/featured");
channelIdRouter.get("/videos");
channelIdRouter.get("/shorts");
channelIdRouter.get("/playlists");
channelIdRouter.get("/community");

export default channelIdRouter;