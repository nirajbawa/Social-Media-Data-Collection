interface ErrorCode {
  message: string;
  code: number;
}

interface ErrorCodes {
  [key: string]: ErrorCode;
}

const ERROR_CODES: ErrorCodes = {
  INTERNAL_SERVER_ERROR: {
    message: "something went wrong",
    code: 500,
  },
  NOT_FOUND_ERROR: {
    message: "route not found",
    code: 404,
  },
};

export default ERROR_CODES;
