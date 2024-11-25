import mongoose, { mongo } from "mongoose";

const dateTimeArr = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T", 2);
const dateString = dateTimeArr[0];
const timeString = dateTimeArr[1].split(".")[0];

const videoSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    thumbnailUrl: [{ type: String, required: true }],
    title: { type: String, required: true, trim: true, maxLength: 100 },
    description: { type: String, trim: true, maxLength: 5000 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    meta: {
        createdAt: { type: String, default: `${dateString}_${timeString}` },
        videoLength: { type: String, required: true },
    },
    video_owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "USER" }
})

const videoModel = mongoose.model("VIDEO", videoSchema);     

export default videoModel;
