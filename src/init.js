import "./db"
import "./models/videoModel"

import app from "./server"

const PORT = 5000;

app.listen(PORT, () => {
    console.log("\x1b[36m%s\x1b[0m", `[O] SERVER IS LISTENING TO PORT ${PORT}`);
    console.log("\x1b[46m%s\x1b[0m", `[ LINK ] --->  http://localhost:${PORT}`);
})
process.on("uncaughtException", (error) => {
    console.log("\x1b[31m%s\x1b[0m", `[X] THERE WAS A PROBLEM LISTENING TO THE PORT ${PORT}`);
    console.log("\x1b[31m%s\x1b[0m", error);
})