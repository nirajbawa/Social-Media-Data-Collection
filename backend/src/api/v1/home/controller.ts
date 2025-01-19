import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import UserForm from "../../../models/UserForm";
// import CustomError from "../../../utils/custom_error/CustomError";

const home = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array(), success: false });
    }

    const { name, socialMediaHandle } = req.body;

    const data = new UserForm({
      name: name.trim(),
      socialMediaHandle: socialMediaHandle.trim(),
      image: req.file.path.trim(),
    });

    await data.save();

    res.status(200).send({
      message: "Data added successfully.",
      success: true,
    });
    // throw new CustomError("hello", 500);
  } catch (e: any) {
    next(e);
  }
};

export default home;
