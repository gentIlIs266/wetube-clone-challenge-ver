import express from "express";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => res.send("HOME"));

app.listen(PORT, () => {
    console.log(`[O] SERVER IS LISTENING TO PORT ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})