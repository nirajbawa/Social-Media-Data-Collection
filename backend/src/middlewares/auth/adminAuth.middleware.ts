import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import customRequest from "../../types/customRequest";

// Define a type for the decoded token, depending on the data you store
export interface DecodedToken {
  username: string;
}

const adminAuthMiddleware = (
  req: customRequest,
  res: Response,
  next: NextFunction,
) => {
  // Retrieve the token from the Authorization header
  const token = req.headers.authorization;
  console.log(token);
  if (token === undefined) {
    return res.status(401).send({
      message: "invalid token",
      success: false,
    });
  }

  try {
    // Verify the token using your secret key
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string,
    ) as DecodedToken;

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default adminAuthMiddleware;
