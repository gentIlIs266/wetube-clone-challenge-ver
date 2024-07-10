export const home = (req, res) => {
    return res.render("home", { tabTitle: "WeTube" })
}
export const userJoin = (req, res) => {}
export const userLogin = (req, res) => {}

export const game = (req, res) => {}
export const podcast = (req, res) => {}
export const youtubePremium = (req, res) => {}
export const youtubeMusic = (req, res) => {}
export const youtubeKids = (req, res) => {}

export const watchLater = (req, res) => {}
export const likeVideo = (req, res) => {}

export const watchVideo = (req, res) => {
    const { videoid } = req.params;
}
export const watchShorts = (req, res) => {}

export const account = (req, res) => {}
export const accountNotification = (req, res) => {}
export const accountPlayback = (req, res) => {}
export const accountPrivacy = (req, res) => {}
export const accountSharing = (req, res) => {}
export const accountBilling = (req, res) => {}
export const accountAdvanced = (req, res) => {}
