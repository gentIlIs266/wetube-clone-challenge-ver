import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube-challenge")

const db = mongoose.connection;

db.once("open", () => {
    console.log("\x1b[32m%s\x1b[0m", "[O]", "DB CONNECTED");
})
db.on("error", (error) => {
    console.error("\x1b[31m%s\x1b[0m", `[X] DB ERROR : ${error}`)
})