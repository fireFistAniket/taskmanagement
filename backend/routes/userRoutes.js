import express, { Router } from "express";
import {
  authUser,
  getUserDetails,
  logOut,
  registerUser,
  updateUserDetails,
} from "../controllers/userController.js";
import { protectAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth", authUser);
router.post("/register", registerUser);
router.get("/logout", logOut);
router
  .route("/")
  .get(protectAuth, getUserDetails)
  .put(protectAuth, updateUserDetails);

export default router;
