import express from "express";
import { loginIn } from "./controller";
import loginFormValidator from "../../../middlewares/validators/auth/loginFormValidator";

const router = express.Router();

router.post("/", loginFormValidator, loginIn);

export default router;
