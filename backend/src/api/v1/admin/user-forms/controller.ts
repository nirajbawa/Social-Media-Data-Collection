import { Response, NextFunction } from "express";
import UserForm from "../../../../models/UserForm";
import customRequest from "../../../../types/customRequest";

export const getUserFormsData = async (
  req: customRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await UserForm.find({});
    if (data) {
      res.status(200).send({
        message: "User validation successful.",
        data,
        success: true,
      });
    } else {
      res.status(404).send({
        message: "Data not found.",
        success: false,
      });
    }
  } catch (e: any) {
    next(e);
  }
};
