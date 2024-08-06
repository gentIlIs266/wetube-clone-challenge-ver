export const myVideo = (req, res) => {
    const {
        session: { _id },
    } = req;
    return res.render("studio-template/my-studio.pug", {
        _id
    });
};
export const getCreateVideo = (req, res) => {
    const {
        session: { _id }
    } = req;
    return res.render("studio-template/create-video.pug", {
        tabTitle: "Creating Video...",
        _id,
    })
};
export const postCreateVideo = (req, res) => {
    const {
        session: { _id },
        body: { step, title, description },
    } = req;
    try {
        if (step === "showFileInput") {

        }
        if (step === "videoInfoSetting") {
             
        }
    } catch (error) {
        return res.render("error", { error });
    }
};
export const getWetubeStudio = (req, res) => {
    const {
        params: { channelId },
        body: { step,  }
    } = req;
    return res.render("studio-template/my-studio", {
        tabTitle: "채널 대시보드 - Wetube Studio",
        channelId,
    });
};
//export const postWetubeStudio = (req, res) => {};
export const videoEdit = (req, res) => {}
export const outline = (req, res) => {}
export const reach = (req, res) => {}
export const participation = (req, res) => {}
export const audience = (req, res) => {}
export const videoEditor = (req, res) => {}

