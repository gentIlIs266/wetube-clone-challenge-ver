import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser";
import path from "path";

import primalRouter from "./routers/primalRouter";
import studioRouter from "./routers/studioRouter";
import apiRouter from "./routers/apiRouter";

import { localsSetting } from "./middleware";

const app = express(); 

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

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
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));

app.use("/", primalRouter);
app.use("/studio", studioRouter);
app.use("/api", apiRouter);


export default app;