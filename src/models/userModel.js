import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    location: { type: String },
    birthDate: { type: Date },
    email: { type: String },
    password: { type: String },
    OAuth: { type: Boolean, default: false }
})

const userModel = mongoose.model("USER", userSchema);

export default userModel;