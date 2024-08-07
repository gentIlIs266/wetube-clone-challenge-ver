import multer from "multer";
import path from "path";

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
            cb(null, "uploads/videdos");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 256000000,
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("video/")) {
            return cb(new Error("WRONG FILE TYPE, ONLY VIDEO FILE ALLOWED"), false);
        };
        cb(null, true);
    },
});

export const avatarFileUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/avatars");
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
    limits: {
        fileSize: 16000000,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'image/jpeg',  
            'image/png',  
            'image/gif',  
            'image/webp',  
            'image/bmp',  
            'image/tiff',  
            'image/svg+xml'
        ];
        if (!allowedMimeTypes.includes(file.mimetype)) {
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
        return res.status(400).send(err.message);
    };
    next();
};