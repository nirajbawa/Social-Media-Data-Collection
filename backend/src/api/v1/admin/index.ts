import express from "express";
import userForm from "./user-forms";
const router = express.Router();

router.use("/user-form", userForm);

export default router;
