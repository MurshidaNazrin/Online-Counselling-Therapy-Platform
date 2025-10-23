
import multer from "multer";
import path from "path";
import fs from "fs";


// dynamically set upload folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = "uploads/";

        if (file.fieldname === "profileImage") {
            uploadPath = "uploads/profileImages/";
        } else if (file.fieldname === "certificate") {
            uploadPath = "uploads/certificates/";
        }

        // create folder if not exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// Allowed fileTypes
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image,png",
        "application/pdf",
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg, .png, .pdf files are allowed"), false);
    }
};

//  initialize multer
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 8 * 1024 * 1024 },
});

export default upload;