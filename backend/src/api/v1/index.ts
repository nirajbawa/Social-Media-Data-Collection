import express from "express";
import home from "./home";
import authentication from "./authentication";
import admin from "./admin";
import adminAuthMiddleware from "../../middlewares/auth/adminAuth.middleware";

const router = express.Router();

router.use("/", home);
router.use("/auth", authentication);
router.use("/admin", adminAuthMiddleware, admin);

export default router;
