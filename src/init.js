import "dotenv/config";

import app from "./server";

import "./db";
import "./models/videoModel";
import "./models/userModel";
import "./models/commentModel";

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(
            "\x1b[1m\x1b[36m", "[  OK  ]", "\x1b[0m",
            "SERVER IS LISTENING TO PORT", PORT
        );
        console.log(
            "\x1b[1m\x1b[36m", "[ LINK ]", "\x1b[0m",
            "\x1b[1m\x1b[33m", "===>", "\x1b[0m",
            "\x1b[4m", `http://localhost:${PORT}`, "\x1b[24m"
        );
    };
});