import VIDEO from "../models/videoModel";
import USER from "../models/userModel";

import bcrypt from "bcrypt";

export const home = async (req, res) => {
    try {
        const DBVIDEO = await VIDEO.find({})
            .sort({ createdAt: "desc" })
        return res.render("home", { tabTitle: "WeTube", DBVIDEO});
    } catch (error) {
        return res.render("error", { error });
    }
};
export const getUserJoin = (req, res) => {
    return res.render("user-template/user-join", {
        tabTitle: "Join"
    })
};
export const postUserJoin = async (req, res) => {
    const {
        name, username, location, birthDate,
        email, password, passwordConfirm
    } = req.body;
    const userIsAlreadyExisting = await USER.exists({ $or: [{ username }, { email }] })
    if (password !== passwordConfirm) {
        //error text
        return res.status(400).redirect("/join");
    }
    if (userIsAlreadyExisting) {
        //error text
        return res.status(400).redirect("/join");
    }
    try {
        await USER.create({
            name,
            username,
            location,
            birthDate,
            email,
            passwordConfirm,
        });
        //if user create an account, redirect to home in logged in
        return res.redirect("/");
    } catch (error) {
        return res.render("error", { error });
    }
}
export const getUserLogin = (req, res) => {
    return res.render("user-template/user-login", {
        tabTitle: "Log in"
    })
};
export const postUserLogin = async (req, res) => {
    const { emailOrUsername, password } = req.body;
    const logInProcess = (input) => {
        req.session.loggedIn = true;
        req.session.user = input;
    };
    const isPasswordCorrect = async (input, userObj) => {
        try {
            const passwordConfirmed = await bcrypt.compare(input, userObj.password);
            return passwordConfirmed;
        } catch (err) {
            return res.render("err", { err }); 
        }
    };
    ((input) => {
        const email_regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i); 
        return email_regex.test(input);
    })(emailOrUsername);
    if (isEmailFormatCorrect) {
        try {
            const findUserByEmail = await USER.findOne({ email: emailOrUsername, OAuth: false });
            if (!findUserByEmail) {
                //message: there's no user using email that you typed
            }
            if (isPasswordCorrect(password, findUserByEmail) === false) {
                //message: wrong password
            }
            logInProcess(findUserByEmail);
        } catch (err) {
            return res.render("error", { err });
        };
    } else {
        try {
            const findUserByUsername = await USER.findOne({ username: emailOrUsername, OAuth: false });
            if (!findUserByUsername) {
                //message: there's no user using username that you typed
            }
            if (isPasswordCorrect(password, findUserByEmail) === false) {
                //message: wrong password
            }
            logInProcess(findUserByUsername);
        } catch (err) {
            return res.render("error", { err });
        }
    }
};

export const game = (req, res) => {};
export const podcast = (req, res) => {};
export const youtubePremium = (req, res) => {};
export const youtubeMusic = (req, res) => {};
export const youtubeKids = (req, res) => {};

export const watchLater = (req, res) => {};
export const likeVideo = (req, res) => {};

export const watchVideo = (req, res) => {
    const {
        v: { videoId }
    } = req.query;
}
export const watchShorts = (req, res) => {}

export const account = (req, res) => {}
export const accountNotification = (req, res) => {}
export const accountPlayback = (req, res) => {}
export const accountPrivacy = (req, res) => {}
export const accountSharing = (req, res) => {}
export const accountBilling = (req, res) => {}
export const accountAdvanced = (req, res) => {}
