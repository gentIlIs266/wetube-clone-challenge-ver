import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, default: "/avatars/default-profile.webp" },
    location: { type: String },
    birthDate: { type: String },
    email: { type: String },
    password: { type: String },
    OAuth: { type: Boolean, default: false },
    user_channel: {
        channel_name: { type: String },
        channel_handle: { type: String },
        channel_id: { type: String },
        channel_subscriber: { type: Number, default: 0 }
    },
    user_video: [{ type: mongoose.Schema.Types.ObjectId, ref: "VIDEO" }],
    user_subscribing_channel: [{ type: String }]
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    };
});

const userModel = mongoose.model("USER", userSchema);

export default userModel;