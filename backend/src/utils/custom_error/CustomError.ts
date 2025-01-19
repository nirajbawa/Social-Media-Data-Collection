import ERROR_CODES from "../../constant/errorCodes";

class CustomError extends Error {
  constructor(
    public message: string = ERROR_CODES.INTERNAL_SERVER_ERROR.message,
    public statusCode: number = ERROR_CODES.INTERNAL_SERVER_ERROR.code,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
