import express from "express";
import morgan from "morgan";

import feedRouter from "./routers/feedRouter";
import handleRouter from "./routers/handleRouter";
import primalRouter from "./routers/primalRouter";
import studioRouter from "./routers/studioRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express(); 

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));

app.use("/", primalRouter);
app.use("/feed", feedRouter);
app.use("/channel", handleRouter);
app.use("/studio", studioRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


export default app;