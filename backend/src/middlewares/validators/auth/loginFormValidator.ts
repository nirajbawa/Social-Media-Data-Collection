import { body } from "express-validator";

const loginFormValidator = [
  body("username").notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
];

export default loginFormValidator;
