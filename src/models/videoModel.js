import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLength: 100 },
    descirption: { type: String, trim: true, maxLength: 5000 },
    meta: {
        views: { type: Number, default: 0 },
        createdAt: { type: Date, default: new Date() },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 }, 
    }
})

const videoModel = mongoose.model("VIDEO", videoSchema);     

export default videoModel;