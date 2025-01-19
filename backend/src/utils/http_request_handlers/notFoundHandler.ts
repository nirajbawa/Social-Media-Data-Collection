import { Request, Response, NextFunction } from "express";
import ERROR_CODES from "../../constant/errorCodes";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const errorCode = ERROR_CODES.NOT_FOUND_ERROR; // Use the specific error code

  const responseObject = {
      message: errorCode.message,
      code: errorCode.code,
      success: false,
  };

  res.status(404).json(responseObject);
  next();
};

export default notFoundHandler;
