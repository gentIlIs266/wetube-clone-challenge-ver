export const myVideo = (req, res) => {
    const {
        session: {
            user
        },
    } = req;
    return res.render("studio-template/my-studio.pug", {});
};
export const getCreateVideo = (req, res) => {
    return res.render("studio-template/create-video.pug", {
        tabTitle: "Creating Video...",
    })
};
export const postCreateVideo = (req, res) => {
    const {
        body: { step, title, description }
    } = req;
    
};
export const getWetubeStudio = (req, res) => {
    const {
        session: {
            user
        },
    } = req;
    return res.render("studio-template/my-studio", {
        tabTitle: "채널 대시보드 - Wetube Studio",
        user
    });
};
export const postWetubeStudio = (req, res) => {

};
export const videoEdit = (req, res) => {}
export const outline = (req, res) => {}
export const reach = (req, res) => {}
export const participation = (req, res) => {}
export const audience = (req, res) => {}
export const videoEditor = (req, res) => {}