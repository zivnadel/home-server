import fs from "fs";
import path from "path";

import { Request, Response } from "express";

import dirTree from "directory-tree";

export const getDirectoryTree = (req: Request, res: Response) => {
  res.send(dirTree("root", { attributes: ["type", "extension"] }));
};

export const getFiles = async (req: Request, res: Response) => {
  const dirname = path.join(__dirname, "..", "..", decodeURIComponent(req.url));

  const tree = dirTree(
    dirname,
    {
      attributes: ["type", "extension"],
    },
    async (item, PATH, stats) => {
      (item as any).file = fs.readFileSync(item.path, "base64");
      const splittedPath = PATH.split("\\root\\").pop();
      item.path = splittedPath;
    },
    (item, PATH, stats) => {
      const splittedPath = path.join("root", PATH.split("\\root\\").pop());
      if (splittedPath.endsWith("\\")) {
        item.path = splittedPath.substring(0, splittedPath.length - 1);
      } else {
        item.path = splittedPath;
      }
    }
  );

  res.send(tree);
};

export const addFiles = (req: Request, res: Response) => {
  res.status(201).json({ message: "Files added successfully" });
};

export const deleteFiles = (req: Request, res: Response) => {
  if (req.body.path === "root") {
    return res.status(400).json({ message: "Cannot delete root folder" });
  }

  const filePath = path.join(__dirname, "..", "..", req.body.path);

  if (fs.existsSync(filePath)) {
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.rmdirSync(filePath, { recursive: true });
    } else {
      fs.unlinkSync(filePath);
    }
  }

  res.json({ message: "Success" });
};
