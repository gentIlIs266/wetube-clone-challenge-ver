import express from "express";

import USER from "../models/userModel";
import VIDEO from "../models/videoModel";
import COMMENT from "../models/commentModel";
import { escape } from "querystring";

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

apiRouter.post("/:videoId([0-9a-z]{24})/comment", async (req, res) => {
    const {
        params: { videoId },
        body: { commentText },
        session: {
            user: sessionUser
        },
    } = req;
    
    const commedtedVideo = await VIDEO.findById(videoId);
    
    if (!commedtedVideo) {
        return res.sendStatus(404);
    };
    
    const userWhoWriteThisComment = await USER.findById(sessionUser._id);
    const newComment = await COMMENT.create({
        commentText,
        comment_owner: sessionUser._id,
        commented_video: videoId,
    });
    
    commedtedVideo.comments.push(newComment._id);
    commedtedVideo.save();
    
    return res.status(201).json({
        newCommentId: newComment._id,
        userWhoWriteThisComment
    });
});

apiRouter.delete("/delete_this_comment/:commentId([0-9a-z]{24})", async (req, res) => {
    const {
        params: { commentId },
        session: {
            user: sessionUser
        },
    } = req;

    const commentToBeDeleted = await COMMENT.findById(commentId);

    if (String(commentToBeDeleted.comment_owner) !== String(sessionUser._id)) {
        return res.sendStatus(401);
    };

    await COMMENT.findByIdAndDelete(commentId);
    await VIDEO.updateOne(
        { _id: commentToBeDeleted.commented_video },
        { $pull: { comments: commentToBeDeleted._id } },
    );

    return res.sendStatus(200);
});

export default apiRouter;