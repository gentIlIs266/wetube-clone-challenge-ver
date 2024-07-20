import VIDEO from "../models/videoModel";
import USER from "../models/userModel";

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
        name, username, location,
        email, password, passwordConfirm
    } = req.body;
    const userIsAlreadyExisting = await USER.exists({ $or: [{ username }, { email }] })
    if (password !== passwordConfirm) {
        const formMessageWrapper = document.createElement("div");
        const shapingThisWrapper = (element) => {
            element.classList.add("form-message-wrapper");
            const formMessage = document.createElement("span");
            formMessage.textContent = "암호를 재입력하십시오."
            element.appendChild(formMessage);
        }
        const passwordWarpperDiv = document.querySelector(".password-wrapper");
        passwordWarpperDiv.classList.add("is-error");
        passwordWarpperDiv.appendChild(shapingThisWrapper(formMessageWrapper));
        return res.status(400)
    }
    if (userIsAlreadyExisting) {
        return res.status(400)
    }
    try {
        await USER.create({
            name,
            username,
            location,
            email,
            passwordConfirm
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
    //ascertain the shape of email and filter the other type(ex. num)
    const userIsExist = await USER.findOne({})
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
