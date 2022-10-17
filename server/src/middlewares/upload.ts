import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `root/${req.body.path}`);
    },
  }),
});

export default upload;
