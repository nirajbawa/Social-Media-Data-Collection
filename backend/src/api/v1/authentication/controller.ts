import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const loginIn = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array(), success: false });
    }

    const { username, password } = req.body;

    if (
      username == process.env.ADMIN_USER &&
      password == process.env.ADMIN_PASSWORD
    ) {
      const jwtToken = jwt.sign(
        { username: username },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" },
      );
      res.status(200).send({
        message: "User validation successful.",
        data: {
          token: jwtToken,
        },
        success: true,
      });
    } else {
      res.status(401).send({ message: "Invalid credentials", success: false });
    }

    res.send("hello");
  } catch (e: any) {
    next(e);
  }
};
