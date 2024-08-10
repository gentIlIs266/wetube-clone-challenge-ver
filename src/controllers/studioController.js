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
        session: {
            user: sessionUser
        }
    } = req;
    return res.render("studio-template/create-video.pug", {
        tabTitle: "Creating Video...",
        sessionUser,
    })
};
export const postCreateVideo = async (req, res) => {
    const {
        session: {
            user: sessionUser
        },
        body: { step, metadataTitle, metadataDescription },
        file,
    } = req;
    let justCreatedVideoId = req.session.justCreatedVideoId || null;
    if (step === "showVideoFileInput") {
        if (!file) {
            return res.status(400).render("studio-template/create-video.pug", {
                step: "showFileInput",
                tabTitle: "Creating Video...",
                sessionUser,
                fileDontExistError: true,
            });
        };
        if (file) {
            try {
                const justCreatedVideo = await VIDEO.create({
                    fileUrl: file.path,
                    title: file.filename,
                    description: "",
                    video_owner: sessionUser._id,
                });
                justCreatedVideoId = justCreatedVideo._id;
                req.session.justCreatedVideoId = justCreatedVideoId;
                console.log("first:", justCreatedVideoId);
            } catch (error) {
                console.error(error);
                return res.status(500).render("studio-template/create-video.pug", {
                    step: "showFileInput",
                    tabTitle: "Creating Video...",
                    sessionUser,
                    unexpectedError: true,
                });
            };
            return res.render("studio-template/create-video.pug", {
                step: "showVideoMetaDataInput",
                tabTitle: "Saving Video...",
                sessionUser,
                file
            });
        };
    };
    if (step === "showVideoMetaDataInput") {
        if (!justCreatedVideoId) {
            return res.status(500).render("studio-template/create-video.pug", {
                step: "showVideoFileInput",
                tabTitle: "Saving Video...",
                sessionUser,
                unexpectedError: true,
            });
        };
        try {
            await VIDEO.findByIdAndUpdate(
                justCreatedVideoId,
                {
                    title: metadataTitle,
                    description: metadataDescription,
                }
            );
            const userCreatedThisVideo = await USER.findById(sessionUser._id);
            userCreatedThisVideo.user_video.push(justCreatedVideoId);
            await userCreatedThisVideo.save();
            return res.redirect(`/studio/channel/${userCreatedThisVideo.user_channel.channel_id}`);
        } catch (error) {
            console.error(error);
            return res.status(500).render("studio-template/create-video.pug", {
                step: "showVideoFileInput",
                tabTitle: "Saving Video...",
                sessionUser,
                unexpectedError: true,
            });
        };
    };
};
export const videoEdit = (req, res) => {}
export const outline = (req, res) => {}
export const reach = (req, res) => {}
export const participation = (req, res) => {}
export const audience = (req, res) => {}
export const videoEditor = (req, res) => {}

