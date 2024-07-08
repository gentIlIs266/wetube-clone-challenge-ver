import express from "express";

import {
    channel, channelHome, channelVideos,
    channelShorts, channelPlaylist, channelCommunity
} from "../controllers/handleController";

const handleRouter = express.Router();

handleRouter.get("/:handle", channel);
handleRouter.get("/:handle/featured", channelHome);
handleRouter.get("/:handle/videos", channelVideos);
handleRouter.get("/:handle/shorts", channelShorts);
handleRouter.get("/:handle/playlists", channelPlaylist);
handleRouter.get("/:handle/community", channelCommunity);

export default handleRouter;