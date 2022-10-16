import express from "express";

import multer from "multer";

const root = multer({ dest: "root/" });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", root.single("test"), (req, res) => {
  console.log("file submitted");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
