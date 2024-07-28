import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

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
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: "chooseRandomStringlater",
        resave: false,
        saveUninitialized: false, 
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/wetube-challenge",
        })
}))

app.use("/", primalRouter);
app.use("/feed", feedRouter);
app.use("/channel", handleRouter);
app.use("/studio", studioRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


export default app;