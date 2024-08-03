import express from "express";

import VIDEO from "../models/videoModel";
import USER from "../models/userModel";

import bcrypt from "bcrypt";

export const home = async (req, res) => {
    const {
        session: {
            user
        },
    } = req;
    try {
        const DBVIDEO = await VIDEO.find({})
            .sort({ createdAt: "desc" });
        return res.render("home", {
            tabTitle: "WeTube",
            DBVIDEO,
            user,
        });
    } catch (error) {
        return res.render("error", { error });
    }
};
export const getUserJoin = (req, res) => {
    return res.render("user-template/user-join", {
        tabTitle: "Join",
    })
};
export const postUserJoin = async (req, res) => {
    const logInProcess = (userObj) => {
        req.session.loggedIn = true;
        req.session.user = userObj;
    };
    const {
        body: {
            name, username, location, birthDate,
            email, password, passwordConfirm
        }
    } = req;
    if (password !== passwordConfirm) {
        return res.status(400).render("user-template/user-join", {
            tabTitle: "Join",
            pwConfirmError: true
        });
    };
    const userIsAlreadyExisting = await USER.exists({ $or: [{ username }, { email }] });
    if (userIsAlreadyExisting) {
        return res.status(400).render("user-template/user-join", {
            tabTitle: "Join",
            alreadyExistError: true,
        });
    };
    try {
        const justCreatedUser = await USER.create({
            name,
            username,
            location,
            birthDate,
            email,
            password,
        });
        logInProcess(justCreatedUser);
        return res.redirect("/");
    } catch (error) {
        return res.render("error", { error });
    };
};
export const getUserLogin = (req, res) => {
    return res.render("user-template/user-login", {
        tabTitle: "Log in"
    });
};
export const postUserLogin = async (req, res) => {
    const logInProcess = (userObj) => {
        req.session.loggedIn = true;
        req.session.user = userObj;
    };
    const {
        body: { step, emailOrUsername, password },
    } = req;
    try {
        const foundUser = await USER.findOne({
            $or: [
                { username: emailOrUsername, OAuth: false },
                { email: emailOrUsername, OAuth: false }
            ]
        });
        if (step === "showFirstInput") {
            if (foundUser) {
                res.render("user-template/user-login", {
                    step: "showPasswordInput",
                    tabTitle: "Log in",
                    emailOrUsername,
                });
            };
            if (!foundUser) {
                res.status(400).render("user-template/user-login", {
                    step: "showFirstInput",
                    tabTitle: "Log in",
                    noUserExistError: true,
                });
            };
        };
        if (step === "showPasswordInput") {
            if (foundUser) {
                const passwordConfirm = await bcrypt.compare(password, foundUser.password);
                if (passwordConfirm) {
                    logInProcess(foundUser);
                    res.redirect("/");
                };
                if (!passwordConfirm) {
                    res.status(400).render("user-template/user-login", {
                        step: "showPasswordInput",
                        tabTitle: "Log in",
                        emailOrUsername,
                        wrongPasswordError: true,
                    });
                };
            } else {
                res.render("user-template/user-login", {
                    step: "showPasswordInput",
                    tabTitle: "Log in",
                });
            }
        };
    } catch (error) {
        if (error === invalidCsrfTokenError) {
            res.status(403).render("error", {
                errorMessage: "Invalid CSRF token",
            });
        };
        res.render("error", { error });
    };
};

export const userLogout = (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                return res.status(500).redirect("/");
            };
            res.clearCookie("connect.sid");
            return res.redirect("/");
        });
    } else {
        return res.status(400).send("NO SESSION EXIST");
    };
};

export const startGhLogin = (req, res) => {
    const primalUrl = "https://github.com/login/oauth/authorize";
    const startGhLoginConfig = {
        client_id: process.env.GHLOGIN_CLIENT_ID,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(startGhLoginConfig).toString();
    const GETGhUrl = `${primalUrl}?${params}`;
    return res.redirect(GETGhUrl);
};
export const finishGhLogin = async (req, res) => {
    const logInProcess = (userObj) => {
        req.session.loggedIn = true;
        req.session.user = userObj;
    };
    const primalUrl = "https://github.com/login/oauth/access_token";
    const finishGhLoginConfig = {
        client_id: process.env.GHLOGIN_CLIENT_ID,
        client_secret: process.env.GHLOGIN_CLIENT_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(finishGhLoginConfig).toString();
    const POSTGhUrl = `${primalUrl}?${params}`;
    const tokenRequest = await (
        await fetch(POSTGhUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            }
        })
    ).json();
    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const ghAPIUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${ghAPIUrl}/user`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        ).json();
        const userEmailData = await (
            await fetch(`${ghAPIUrl}/user/emails`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
        ).json();
        const emailObj = userEmailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) res.redirect("/login");
        let foundUserFromDB = await USER.findOne({ email: emailObj.email });
        if (!foundUserFromDB) {
            const justCreatedUser = await USER.create({
                name: userData.name,
                username: userData.login,
                location: userData.location ? userData.location : "",
                birthDate: "",
                email: emailObj.email,
                password: "",
                OAuth: true,
                avatarURL: userData.avatar_url,
            });
            logInProcess(justCreatedUser);
            return res.redirect("/");
        };
        logInProcess(foundUserFromDB);
        return res.redirect("/");
    } else {
        return res.redirect("/login");
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

export const account = (req, res) => {
    return res.render("account-template/account.pug", {
        tabTitle: "WeTube",
    })
}
export const accountNotification = (req, res) => {}
export const accountPlayback = (req, res) => {}
export const accountPrivacy = (req, res) => {}
export const accountSharing = (req, res) => {}
export const accountBilling = (req, res) => {}
export const accountAdvanced = (req, res) => {}


