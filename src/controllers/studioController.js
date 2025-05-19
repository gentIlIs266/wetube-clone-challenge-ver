import VIDEO from "../models/videoModel";
import USER from "../models/userModel";
import path from "path";
import fs from "fs";
import Ffmpeg from "fluent-ffmpeg";
Ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");
Ffmpeg.setFfprobePath("/usr/bin/ffprobe");

export const getWetubeStudio = async (req, res) => {
    const sessionUser = req.session.user;
    const foundUser = await USER.findOne({ _id: sessionUser._id }).populate("user_video");

    if (!foundUser) {
        console.log("no user exist");
        return res.status(404).render("error.pug", { errorMessage: "NO_USER_EXIST" });
    };    

    return res.render("studio-template/my-studio.pug", {
        tabTitle: "채널 콘텐츠 - WeTube Studio",
        foundUser
    });
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
                FILE_DONT_EXIST_ERROR: true,
            });
        } else {
            try {
                /*ffmpeg extract video duration start*/
                const absoluteFilePath = path.resolve(file.path).replace(/\\/g, "/");
                const extractedMetadata = await new Promise((resolve, reject) => {
                    Ffmpeg.ffprobe(absoluteFilePath, (err, metadata) => {
                        if (err) return reject(err);
                        resolve(metadata);
                    });
                });
                const durationInSecondInt = Math.floor(extractedMetadata.format.duration);
                const hour = Math.floor(durationInSecondInt / 3600);
                const minute = Math.floor((durationInSecondInt % 3600) / 60);
                const second = (durationInSecondInt % 60).toString().padStart(2, "0");
                const outputFormat = (hour >= 1)
                    ? `${hour}:${minute}:${second}`
                    : `${minute}:${second}`;
                /*ffmpeg extract video duration end*/
                
                /*ffmpeg extract video thumbnail start*/
                const thumbnailFileSavePath = `uploads/thumbnails/${file.filename}`;
                await fs.promises.mkdir(thumbnailFileSavePath, { recursive: true });

                const { width, height } = extractedMetadata.streams.find((stream) => stream.width && stream.height) || {};

                if (!width && !height) {
                    return res.status(500).render("studio-template/create-video.pug", {
                        step: "showFileInput",
                        tabTitle: "Creating Video...",
                        sessionUser,
                        EXTRACT_THUMBNAIL_SIZE_ERROR: true,
                    });
                };
                const screenshotTimestamps = ["33%", "66%"];
                function ffmpegScreenshotTimestampFormatting (videoDuration, percent) {
                    const timeInSeconds = (videoDuration * (parseFloat(percent) / 100)).toFixed(1);
                    return parseFloat(timeInSeconds);
                };
                const formattedTimestamps = screenshotTimestamps.map(
                    (percent) => ffmpegScreenshotTimestampFormatting(extractedMetadata.format.duration, percent)
                );
                let extractedThumbnailPaths = [];
                await new Promise((resolve, reject) => {
                    Ffmpeg(absoluteFilePath)
                        .screenshots({
                            timestamps: formattedTimestamps,
                            filename: `${file.filename}-screenshot-at-%s-s.jpg`,
                            folder: thumbnailFileSavePath,
                            size: `${width}x${height}`
                        })
                        .on("filenames", (filenames) => {
                            extractedThumbnailPaths = filenames.map(
                                (name) => path.join(thumbnailFileSavePath, name)
                            );
                        })
                        .on("end", resolve)
                        .on("error", reject);
                });
                const justCreatedVideo = await VIDEO.create({
                    fileUrl: file.path,
                    thumbnailUrl: extractedThumbnailPaths,
                    title: file.filename,
                    description: "",
                    video_owner: sessionUser._id,
                    meta: {
                        videoLength: outputFormat,
                    }
                });
                justCreatedVideoId = justCreatedVideo._id;
                req.session.justCreatedVideoId = justCreatedVideo._id;
            } catch (error) {
                console.error("FFMPEG_EXTRACT_METADATA_ERROR", error);
                return res.status(500).render("studio-template/create-video.pug", {
                    step: "showVideoFileInput",
                    tabTitle: "Saving Video...",
                    sessionUser,
                    durationExtractError: true,
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

            return res.redirect(`/studio/${justCreatedVideoId}/edit`);
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

export const getVideoEdit = async (req, res) => {
    const videoIdToEdit = req.params.videoId;
    const sessionUser = req.session.user;
    const foundVideoToEdit = await VIDEO.findById(videoIdToEdit);

    if (!foundVideoToEdit) {
        return res.status(404).render("error.pug", { errorMessage: "NO_VIDEO_ERROR" });
    };
    if (String(foundVideoToEdit.video_owner) !== String(sessionUser._id)) {
        return res.status(403).render("error.pug", { errorMessage: "NOT_AUTHORIZED" });
    };
    
    return res.render("studio-template/video-edit.pug", {
        tabTitle: "동영상 세부정보 - WeTube Studio",
        STUDIO_PARTIALS: true,
        foundVideoToEdit,
        sessionUser
    });
};
export const postVideoEdit = async (req, res) => {
    const {
        params: { videoId },
        session: {
            user: { _id: userId }
        },
        body: { editedTitle, editedDescription },
    } = req;
    const videoToBeEdited = await VIDEO.exists({ _id: videoId }).populate("video_owner");
    
    if (!videoToBeEdited) {
        console.error("video not found");
        return res.status(404).render("error.pug", { errorMessage: "VIDEO_NOT_FOUND" });
    };
    if (String(videoToBeEdited.video_owner._id) !== String(userId)) {
        console.error("not authorized");
        return res.status(403).render("error.pug", { errorMessage: "NOT_AUTHORIZED" });
    };

    await VIDEO.findByIdAndUpdate(
        videoId,
        {
            title: editedTitle ? editedTitle : videoToBeEdited.title,
            description: editedDescription ? editedDescription : videoToBeEdited.description,
        }
    );
    return res.redirect(`/studio/${videoId}/edit`)
};

export const deleteVideo = async (req, res) => {
    const {
        params: { videoId },
        session: {
            user: { _id: userId }
        },
    } = req;
    const videoToBeDeleted = await VIDEO.findById(videoId);

    if (!videoToBeDeleted) {
        console.error("video not found");
        return res.status(404).render("error", { errorMessage: "VIDEO_NOT_FOUND" });
    };
    if (String(videoToBeDeleted.video_owner) !== String(userId)) {
        console.error("not authorized");
        return res.status(404).render("error", { errorMessage: "NOT_AUTHORIZED" });
    };

    await VIDEO.findByIdAndDelete(videoId);
    await USER.updateOne(
        { _id: userId },
        { $pull: { user_video: videoToBeDeleted._id } },
    );
    

    return res.redirect("/");
};