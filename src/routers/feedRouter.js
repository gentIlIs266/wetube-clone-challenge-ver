import express from "express";

import {
    subcriptions, me, viewingHistory, playlists,
    trendingVideo, movie, studyProgram
} from "../controllers/feedController";

const feedRouter = express.Router();

feedRouter.get("/subscriptions", subcriptions);
feedRouter.get("/you", me);
feedRouter.get("/history", viewingHistory);
feedRouter.get("/playlists", playlists);
feedRouter.get("/trending?bp=", trendingVideo);
feedRouter.get("/storefront?bp=", movie);
feedRouter.get("/courses_destination", studyProgram);

export default feedRouter;