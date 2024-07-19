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
}
export const getUserJoin = (req, res) => {
    return res.render("user-template/user-join", {
        tabTitle: "Join"
    })
}
export const postUserJoin = (req, res) => {
    const {
        name, username, location,
        email, password, passwordConfirm
    } = req.body;
    if (password !== passwordConfirm) {
        return res.status(400)
    }
}
export const getUserLogin = (req, res) => {}
export const postUserLogin = (req, res) => {}

export const game = (req, res) => {}
export const podcast = (req, res) => {}
export const youtubePremium = (req, res) => {}
export const youtubeMusic = (req, res) => {}
export const youtubeKids = (req, res) => {}

export const watchLater = (req, res) => {}
export const likeVideo = (req, res) => {}

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
