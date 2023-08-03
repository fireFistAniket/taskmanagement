import express from "express";
import { protectAuth } from "../middleware/authMiddleware.js";
import {
  addTask,
  deleteTask,
  getAllTaskOfUser,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/add").post(protectAuth, addTask);
router.route("/").get(protectAuth, getAllTaskOfUser);
router
  .route("/:taskId")
  .put(protectAuth, updateTask)
  .delete(protectAuth, deleteTask);

export default router;
