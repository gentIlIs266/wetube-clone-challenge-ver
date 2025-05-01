import mongoose from "mongoose";

const dateTimeArr = new Date((new Date).getTime() - (new Date).getTimezoneOffset() * 60000)
    .toISOString()
    .split("T", 2);
const dateString = dateTimeArr[0];
const timeString = dateTimeArr[1].split(".")[0];

const commentSchema = new mongoose.Schema({
    commentText: { type: String, required: true },
    createdAt: { type: String, required: true, default: `${dateString}_${timeString}` },
    comment_owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "USER" },
    commented_video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "VIDEO" }
});

const commentModel = mongoose.model("COMMENT", commentSchema);

export default commentModel;