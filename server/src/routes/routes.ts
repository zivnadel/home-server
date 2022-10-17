import express from "express";

import dirTree from "directory-tree";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(dirTree("root", { attributes: ["type", "extension"] }));
});

router.post("/", upload.any());

export default router;
