import { NextFunction, Request, Response } from "express";
import logger from "../../config/logger";

const entryHandler = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request received: ${req.method} ${req.url} `);
  next();
};

export default entryHandler;
