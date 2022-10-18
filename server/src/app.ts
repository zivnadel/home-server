import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import routes from "./routes/routes";
import HttpError from "./utils/HttpError";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Accept-Language"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use("/root", express.static("root"));

app.use("/", routes);

app.use((req, res, next) => {
  throw new HttpError("Could not find this route.", 404);
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
