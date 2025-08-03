import multer from "multer";
import path from "path";

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, "resume" + path.extname(file.originalname)); // e.g. resume.pdf
  },
});

export const upload = multer({ storage });
