import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    location: { type: String },
    birthDate: { type: Date },
    email: { type: String },
    password: { type: String },
    OAuth: { type: Boolean, default: false }
});

userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
});

const userModel = mongoose.model("USER", userSchema);

export default userModel;