import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import path from "path";

import feedRouter from "./routers/feedRouter";
import handleRouter from "./routers/handleRouter";
import primalRouter from "./routers/primalRouter";
import studioRouter from "./routers/studioRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import { localsSetting } from "./middleware";

const app = express(); 

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false, 
        cookie: {
            secure: false,
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1209600000,
         },
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        })
    })
);

app.use(localsSetting);

app.use("/avatars", express.static(path.join("public/avatars")));

app.use("/", primalRouter);
app.use("/feed", feedRouter);
app.use("/channel", handleRouter);
app.use("/studio", studioRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


export default app;