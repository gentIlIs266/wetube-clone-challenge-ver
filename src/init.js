import app from "./server"

import "./db"
import "./models/videoModel"

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        "\x1b[1m\x1b[36m", "[  OK  ]", "\x1b[0m",
        "SERVER IS LISTENING TO PORT", PORT
    );
    console.log(
        "\x1b[1m\x1b[36m", "[ LINK ]", "\x1b[0m",
        "\x1b[1m\x1b[33m", "===>", "\x1b[0m",
        "\x1b[4m", `http://localhost:${PORT}`, "\x1b[24m"
    );
})
/* process.on("uncaughtException", (error) => {
    console.log("\x1b[31m%s\x1b[0m", `[X] THERE WAS A PROBLEM LISTENING TO THE PORT ${PORT}`);
    console.log("\x1b[31m%s\x1b[0m", error);
})
*/
