import VIDEO from "../models/videoModel";
import USER from "../models/userModel";
import path from "path";
import fs from "fs";
import Ffmpeg from "fluent-ffmpeg";
Ffmpeg.setFfmpegPath("C:\\Users\\10-231105\\Downloads\\ffmpeg-master-latest-win64-gpl\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe");
Ffmpeg.setFfprobePath("C:\\Users\\10-231105\\Downloads\\ffmpeg-master-latest-win64-gpl\\ffmpeg-master-latest-win64-gpl\\bin\\ffprobe.exe");

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
                const screenshotTimestamps = ["1%", "50%", "99%"];
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
export const postVideoEdit = (req, res) => {

};
