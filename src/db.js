import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube-challenge")

const db = mongoose.connection;

db.once("open", () => {
    console.log("\x1b[1m\x1b[36m", "[  OK  ]", "\x1b[0m", "DB CONNECTED");
})
db.on("error", (error) => {
    console.error("\x1b[31;1m%s\x1b[0m", ` [  NO  ] DB ERROR : ${error}`)
})