import multer from "multer";
import iconv from "iconv-lite";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

const s3StorageForVideo = multerS3({
    s3: s3Client,
    bucket: "wetube-jhs-did-upload",
    acl: "public-read",
    key: function(req, file, cb) {
        const decodedFileName = iconv.decode(Buffer.from(file.originalname, 'binary'), 'utf-8');
        cb(null, `videos/${req.session.user._id}/${decodedFileName}`);
    }
});
const s3StorageForAvatar = multerS3({
    s3: s3Client,
    bucket: "wetube-jhs-did-upload",
    acl: "public-read",
    key: function(req, file, cb) {
        cb(null, `avatars/${req.session.user._id}/${file.originalname}`);
    }
});

export const localsSetting = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    next();
};

export const shouldLogInForThisUrl = (req, res, next) => {
    const userIsLoggedIn = req.session.loggedIn;
    if (userIsLoggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    };
};

export const shouldNotLogInForThisUrl = (req, res, next) => {
    console.log(!req.session.loggedIn)
    const userIsNotLoggedIn = !req.session.loggedIn;
    if (userIsNotLoggedIn) {
        return next();
    } else {
        return res.redirect("/");
    };
};

export const videoFileUpload = multer({
    storage: s3StorageForVideo,
    limits: {
        fileSize: 256 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedVideoMimeTypes = [
            'video/mp4',
            'video/x-msvideo',
            'video/x-matroska',
            'video/webm',
            'video/quicktime'
        ];
        if (!allowedVideoMimeTypes.includes(file.mimetype)) {
            return cb(new Error("WRONG FILE TYPE, ONLY VIDEO FILE ALLOWED"), false);
        };
        cb(null, true);
    },
});

export const avatarFileUpload = multer({
    storage: s3StorageForAvatar,
    limits: {
        fileSize: 3000000,
    },
    fileFilter: (req, file, cb) => {
        const allowedImageMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/bmp",
        ];
        if (!allowedImageMimeTypes.includes(file.mimetype)) {
            return cb(new Error("WRONG FILE TYPE, ONLY IMAGE FILE ALLOWED"), false);
        };
        cb(null, true);
    },
});

export const multerVideoErrorHandling = (err, rea, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).render("studio-template/create-video.pug", {
            tabTitle: "Creating Video...",
            fileSizeOverError: true,
        });
    } else if (err) {
        console.error(err);
        return res.status(400).send(err.message);
    };
    next();
};

export const multerAvatarErrorHandling = (err, rea, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).render("user-template/account-edit.pug", {
            tabTitle: "Error While Editing...",
        });
    } else if (err) {
        console.error(err);
        return res.status(400).send(err.message);
    };
    next();
};