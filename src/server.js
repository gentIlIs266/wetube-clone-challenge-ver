import express from "express";
import morgan from "morgan";

import channelIdRouter from "./routers/channelIdRouter";
import channelRouter from "./routers/channelRouter";
import feedRouter from "./routers/feedRouter";
import primalRouter from "./routers/primalRouter";
import shortsRouter from "./routers/shortsRouter";
import studioRouter from "./routers/studioRouter";
import userIdRouter from "./routers/userIdRouter";
import userRouter from "./routers/userIdRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 5000;
const app = express();

app.use(morgan("dev"));

app.use("/", primalRouter);
app.use("/feed", feedRouter);
app.use("/shorts", shortsRouter);
app.use("/channel", channelRouter);
app.use("/studio", studioRouter);
app.use("/:userid", userIdRouter);
app.use("/:channelid", channelIdRouter);

app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, () => {
    console.log(`[O] SERVER IS LISTENING TO PORT ${PORT}`);
    console.log(`[ LINK ] --->  http://localhost:${PORT}`);
})