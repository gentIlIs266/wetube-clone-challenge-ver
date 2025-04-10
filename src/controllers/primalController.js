import VIDEO from "../models/videoModel";
import USER from "../models/userModel";

import bcrypt from "bcrypt";

export const home = async (req, res) => {
    const {
        session: { user },
    } = req;
    try {
        const DBVIDEO = await VIDEO.find({})
            .sort({ createdAt: "desc" })
            .populate("video_owner");
        return res.render("home.pug", {
            tabTitle: "WeTube",
            DBVIDEO,
            user,
        });
    } catch (error) {
        return res.render("error", { error });
    };
};
export const getUserJoin = (req, res) => {
    return res.render("user-template/user-join", {
        tabTitle: "WeTube 계정 생성",
        isThisPageJoinOrLogin: true,
        error: {
            ERROR_NO_NAME: false,
            ERROR_NO_USERNAME: false,
            ERROR_NO_BIRTHDATE: false,
            ERROR_NO_EMAIL: false,
            ERROR_NO_PASSWORD: false,
            ERROR_NO_PASSWORD_CONFIRM: false,
            ERROR_NO_ADI_TO_ASP_POLICY: false,
            ERROR_PASSWORD_CONFIRM_DOESNT_MATCH: false,
            ERROR_USER_IS_ALREADY_USING_THIS_USERNAME: false,
            ERROR_THERE_IS_USER_USING_THIS_EMAIL: false,
        },
    });
};
export const postUserJoin = async (req, res) => {
    const {
        body: { name, username, location, birthDate, email, password, passwordConfirm, adiToAspPolicy }
    } = req;
    function charGenerator(min, max) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charLength = (Math.floor(Math.random() * (max - min + 1)) + min);
        let output = "";
        for (let i = 0; i < charLength; i++) {
            output += chars.charAt(Math.floor(Math.random() * chars.length));
        };
        return output;
    };
    async function uniqueValueGenerator(paramUsername) {
        let channelId, channelHandle;
        while (true) {
            channelId = charGenerator(19, 25);
            channelHandle = `@${paramUsername}-${charGenerator(5, 7)}`;
            const isUserHadAlreadySameValue = await USER.exists({
                $or: [
                    { "user_channel.channel_id": channelId },
                    { "user_channel.channel_handle": channelHandle }
                ]
            });
            if (!isUserHadAlreadySameValue) break;
        };
        return { channelId, channelHandle };
    };
    let joinRenderParamObj = {
        tabTitle: "WeTube 계정 생성",
        isThisPageJoinOrLogin: true,
        error: {
            ERROR_NO_NAME: !name,
            ERROR_NO_USERNAME: !username,
            ERROR_NO_BIRTHDATE: !birthDate,
            ERROR_NO_EMAIL: !email,
            ERROR_NO_PASSWORD: !password,
            ERROR_NO_PASSWORD_CONFIRM: !passwordConfirm,
            ERROR_NO_ADI_TO_ASP_POLICY: !adiToAspPolicy,
            ERROR_PASSWORD_CONFIRM_DOESNT_MATCH: (password !== passwordConfirm),
            ERROR_USER_IS_ALREADY_USING_THIS_USERNAME: false,
            ERROR_THERE_IS_USER_USING_THIS_EMAIL: false,
        },
        inputRefreshValue: {
            REFRESH_NAME: name || "",
            REFRESH_USERNAME: username || "",
            REFRESH_BIRTHDATE: birthDate || "",
            REFRESH_EMAIL: email || "",
            REFRESH_PASSWORD: password || "",
            REFRESH_PASSWORD_CONFIRM: passwordConfirm || "",
            REFRESH_ADI_TO_ASP_POLICY: adiToAspPolicy || "",
        },
    };
    try {
        const [ userWithSameUsername, userWithSameEmail ] = await Promise.all(
            [ USER.exists({ username }), USER.exists({ email }) ]
        );
        if (userWithSameUsername) joinRenderParamObj.error.ERROR_USER_IS_ALREADY_USING_THIS_USERNAME = true;
        if (userWithSameEmail) joinRenderParamObj.error.ERROR_THERE_IS_USER_USING_THIS_EMAIL = true;
        if (Object.values(joinRenderParamObj.error).some((error) => error)) {
            return res.status(400).render("user-template/user-join", joinRenderParamObj);
        };
        const { channelId, channelHandle } = await uniqueValueGenerator(username);
        const justCreatedUser = await USER.create({
            name,
            username,
            location,
            birthDate,
            email,
            password,
            user_channel: {
                channel_name: username,
                channel_id: channelId,
                channel_handle: channelHandle,
            },
        });
        req.session.loggedIn = true;
        req.session.user = justCreatedUser;
        return res.redirect("/");
    } catch (error) {
        return res.render("error", { error });
    };
};
export const getUserLogin = (req, res) => {
    return res.render("user-template/user-login", {
        tabTitle: "로그인",
        step: "",
        isThisPageJoinOrLogin: true,
        showErrorStyling: false,
        error: {
            noUserExistError: false,
            wrongPasswordError: false,
        },
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
    let loginRenderParamObj = {
        tabTitle: "로그인",
        step: "",
        isThisPageJoinOrLogin: true,
        showErrorStyling: false,
        showErrorPopover: false,
        error: {
            noUserExistError: false,
            wrongPasswordError: false,
        },
    };
    try {
        const foundUser = await USER.findOne({
            $or: [
                { username: emailOrUsername, OAuth: false },
                { email: emailOrUsername, OAuth: false }
            ]
        });
        if (step === "showFirstInput") {
            if (foundUser) {
                loginRenderParamObj.step = "showPasswordInput";
                loginRenderParamObj.emailOrUsername = emailOrUsername;
                console.log(loginRenderParamObj)
                res.render("user-template/user-login", loginRenderParamObj);
            };
            if (!foundUser) {
                loginRenderParamObj.step = "showFirstInput";
                loginRenderParamObj.error.noUserExistError = true;
                loginRenderParamObj.showErrorStyling = true;
                loginRenderParamObj.showErrorPopover = true;
                res.status(400).render("user-template/user-login", loginRenderParamObj);
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
                    loginRenderParamObj.step = "showPasswordInput";
                    loginRenderParamObj.emailOrUsername = emailOrUsername;
                    loginRenderParamObj.error.wrongPasswordError = true;
                    loginRenderParamObj.showErrorStyling = true;
                    loginRenderParamObj.showErrorPopover = true;
                    res.status(400).render("user-template/user-login", loginRenderParamObj);
                };
            } else {
                loginRenderParamObj.step = "showPasswordInput";
                res.render("user-template/user-login", loginRenderParamObj);
            };
        };
    } catch (error) {
        return res.render("error", { error });
    };
};

export const userLogout = (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) return res.status(500).redirect("/");
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

export const watchVideo = async (req, res) => {
    const {
        query: {
            v: videoId, t: videoTime
        },
        session: { user }
    } = req;
    if (!videoId) return res.redirect("/");
    const foundVideoFromDB = await VIDEO.findById(videoId).populate("video_owner");
    /*if (foundVideoFromDB === null)*/
    return res.render("watch-video.pug", {
        tabTitle: foundVideoFromDB.title,
        user,
        foundVideoFromDB,
        ownerOfTheVideoIsWatching: (user._id == foundVideoFromDB.video_owner._id),
        isThisPageWatchVideo: true,
    });
}

export const watchChannel = async (req, res) => {
    if (!new RegExp("@([가-힣a-zA-Z0-9]+)-([a-zA-Z0-9]+)").test(req.params.channelHandle)) {
        console.error("channel dosen't exist");
        return res.redirect("/");
    };
    const user = await USER
        .findOne({"user_channel.channel_handle": req.params.channelHandle})
        .populate({
            path: "user_video",
            populate: { path: "video_owner" }
        });

    if (!user) {
        console.log("channel owner don't exist");
        //flash message
        return res.status(404).redirect("/");
    };

    return res.render("partials/channel.pug", {
        tabTitle: `${user.user_channel.channel_name}`,
        user
    });
};