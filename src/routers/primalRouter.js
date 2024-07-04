import express from "express";

const primalRouter = express.Router();

primalRouter.get("/", home);
primalRouter.get("/watch?:videoId", );

export default primalRouter;