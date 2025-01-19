// eslint-disable-next-line import/no-extraneous-dependencies
import { body } from "express-validator";

const validateUserFromInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("socialMediaHandle")
    .notEmpty()
    .withMessage("Social Media Handle is required"),
];

export default validateUserFromInput;
