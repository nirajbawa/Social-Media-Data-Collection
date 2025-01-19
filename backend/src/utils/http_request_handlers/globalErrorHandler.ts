import { Request, Response, NextFunction } from "express";
import CustomError from "../custom_error/CustomError";
import ERROR_CODES from "../../constant/errorCodes";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code } = ERROR_CODES.INTERNAL_SERVER_ERROR;
  const { message } = ERROR_CODES.INTERNAL_SERVER_ERROR;
  let statusCode = code;
  let msg = message;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    msg = err.message;
  }

  res.status(statusCode).json({ message: msg, success: false });
  next();
};

export default globalErrorHandler;
