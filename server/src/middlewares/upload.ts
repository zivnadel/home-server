import multer from "multer";
import fs from "fs";

import utf8 from "utf8";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.body.path) {
        cb(null, `${req.body.path}`);
      } else {
        const path = utf8.decode(file.fieldname);
        const folderPath = path.split("\\");
        folderPath.pop();
        const newPath = folderPath.join("\\");
        fs.mkdirSync(newPath, { recursive: true });
        cb(null, newPath);
      }
    },
    filename: (req, file, cb) => {
      cb(null, utf8.decode(file.originalname));
    },
  }),
});

export default upload;
