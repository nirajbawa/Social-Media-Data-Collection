import express from "express";
import home from "./controller";
import imageUploadMiddleware from "../../../middlewares/uploads/imageUpload.middleware";
import validateUserFromInput from "../../../middlewares/validators/user/userFormValidator";

const router = express.Router();

router.post("/", imageUploadMiddleware, validateUserFromInput, home);

export default router;
