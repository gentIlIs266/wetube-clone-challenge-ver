import express from "express";

const channelRouter = express.Router();

channelRouter.get("/:handle", channel);
channelRouter.get("/:handle/featured", channelHome);
channelRouter.get("/:handle/videos", channelVideos);
channelRouter.get("/:handle/shorts", channelShorts);
channelRouter.get("/:handle/playlists", channelPlaylist);
channelRouter.get("/:handle/community", channelCommunity);

export default handleRouter;