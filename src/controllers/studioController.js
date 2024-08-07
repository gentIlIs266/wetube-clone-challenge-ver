import VIDEO from "../models/videoModel";
import USER from "../models/userModel";

export const myVideo = (req, res) => {
    const {
        session: { _id },
    } = req;
    return res.render("studio-template/my-studio.pug", {
        _id
    });
};
export const getWetubeStudio = (req, res) => {
    const {
        session: { user }
    } = req;
    return res.render("studio-template/my-studio", {
        tabTitle: "채널 대시보드 - Wetube Studio",
        user,
    });
};
export const postWetubeStudio = (req, res) => {
    
};
export const getCreateVideo = (req, res) => {
    const {
        session: { user }
    } = req;
    return res.render("studio-template/create-video.pug", {
        tabTitle: "Creating Video...",
        user,
    })
};
export const postCreateVideo = async (req, res) => {
    const {
        session: { user },
        body: { step, title, description },
        file,
    } = req;
    if (step === "showVideoFileInput") {
        if (!file) {
            return res.status(400).render("studio-template/create-video.pug", {
                step: "showFileInput",
                tabTitle: "Creating Video...",
                fileDontExistError: true,
            });
        };
        return res.render("studio-template/create-video.pug", {
            step: "showVideoMetaDataInput",
            tabTitle: "Saving Video...",
            user
        });
    };
    if (step === "showVideoMetaDataInput") {
        try {
            const justCreatedVideo = await VIDEO.create({
                fileUrl: file.fileUrl,
                title,
                description
            });
            const userWhoCreatedThisVideo = await USER.findById(_id);
            userWhoCreatedThisVideo.user_video.push(justCreatedVideo._id);
            userWhoCreatedThisVideo.save();
            return res.redirect(`/studio/channel/${_id}`);
        } catch (error) {
            return res.render("error", { error });
        };
    };
};
export const videoEdit = (req, res) => {}
export const outline = (req, res) => {}
export const reach = (req, res) => {}
export const participation = (req, res) => {}
export const audience = (req, res) => {}
export const videoEditor = (req, res) => {}

