import express from "express";

import VIDEO from "../models/videoModel";
import USER from "../models/userModel";

import bcrypt from "bcrypt";

import { logInProcess } from "../global-function";

export const home = async (req, res) => {
    try {
        const DBVIDEO = await VIDEO.find({})
            .sort({ createdAt: "desc" });
        return res.render("home", { tabTitle: "WeTube", DBVIDEO});
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
            passwordConfirm,
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
    })
};
export const postUserLogin = async (req, res) => {
    const {
        body: { emailOrUsername, password },
    } = req;
    try {
        const findByEmailOrUsername = await USER.findOne({
            $or: [
                { username: emailOrUsername, OAuth: false },
                { email: emailOrUsername, OAuth: false }
            ]
        });
        if (!findByEmailOrUsername) {
            return res.status(400).render("user-template/user-login", {
                tabTitle: "Log in",
                noUserExistError: true,
            });
        };
        pwInputCreate();
    } catch (error) {
        return res.render("error", { error });
    };
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
