import multer from "multer";

import utf8 from "utf8";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${req.body.path}`);
    },
    filename: (req, file, cb) => {
      cb(null, utf8.decode(file.originalname));
    },
  }),
});

export default upload;
