import express from "express";

import VIDEO from "../models/videoModel";

const apiRouter = express.Router();

apiRouter.post("/:videoId([0-9a-z]{24})/record_views", async (req, res) => {
    const videoId = req.params.videoId;
    const videoThatRecordViews = await VIDEO.findById(videoId);

    if (!videoThatRecordViews) {
        return res.sendStatus(404);
    };
    
    videoThatRecordViews.views += 1;
    await videoThatRecordViews.save();
    
    return res.sendStatus(200);
});

export default apiRouter;