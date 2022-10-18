import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/HttpError";

const authorize = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization !== `Bearer ${process.env.DELETE_PASSWORD}`) {
    return next(new HttpError("!סיסמא שגויה", 401));
  }
  next();
};

export default authorize;
