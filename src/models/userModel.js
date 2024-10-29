import mongoose from "mongoose";
import bcrypt from "bcrypt";

const generateRandomString = (length, forId, forHandle) => {
    const forIdCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const forHandlecharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let characters = "";
    if (forId) {
        characters = forIdCharacters;
    };
    if (forHandle) {
        characters = forHandlecharacters;
    };
    let result = "";
    const charactersLength = characters.length;
    for (let i =0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters[randomIndex];
    };
    return result;
};

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
        channel_id: { type: String, default: `${generateRandomString(25, true, false)}` }
    },
    user_video: [{ type: mongoose.Schema.Types.ObjectId, ref: "VIDEO" }]
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    };
    if (this.isNew) {
        this.user_channel.channel_name = this.username
        this.user_channel.channel_handle = `@${this.username}-${generateRandomString(5, false, true)}`
    };
});

const userModel = mongoose.model("USER", userSchema);

export default userModel;