import multer from "multer";
import iconv from "iconv-lite";

export const localsSetting = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user || {};
    return next();
};

export const shouldLogInForThisUrl = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    };
    if (!req.session.loggedIn) {
        return res.redirect("/login");
    };
};

export const shouldNotLogInForThisUrl = (req, res, next) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    };
    if (!req.session.loggedIn) {
        return next();
    };    
};

export const videoFileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/videos");
        },
        filename: (req, file, cb) => {
            const decodedFileName = iconv.decode(Buffer.from(file.originalname, "binary"), "utf-8");
            cb(null, `${decodedFileName}`);
        },
    }),
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

//export const avatarFileUpload = ;

export const multerVideoErrorHandling = (err, rea, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).render("studio-template/create-video.pug", {
            tabTitle: "Creating Video...",
            fileSizeOverError: true,
        });
    } else if (err) {
        console.error(err)
        return res.status(400).send(err.message);
    };
    next();
};