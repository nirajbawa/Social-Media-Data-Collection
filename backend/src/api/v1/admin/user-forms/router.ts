import express from "express";
import { getUserFormsData } from "./controller";
const router = express.Router();

router.get("/", getUserFormsData);

export default router;
