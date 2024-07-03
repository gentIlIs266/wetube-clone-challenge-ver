import express from "express";
import morgan from "morgan";

const app = express();
const PORT = 5000;

app.use(morgan("dev"));



app.listen(PORT, () => {
    console.log(`[O] SERVER IS LISTENING TO PORT ${PORT}`);
    console.log(`[ LINK ] --->  http://localhost:${PORT}`);
})