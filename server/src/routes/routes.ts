import express from "express";

import upload from "../middlewares/upload";
import {
  getDirectoryTree,
  getFiles,
  addFiles,
  deleteFiles,
} from "../controllers/controllers";
import authorize from "../middlewares/authorize";

const router = express.Router();

router.get("/", getDirectoryTree);

router.get("/root/*", getFiles);

router.post("/", upload.any(), addFiles);

router.use("/", authorize);

router.delete("/", deleteFiles);

export default router;
