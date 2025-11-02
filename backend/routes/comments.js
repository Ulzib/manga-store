import express from "express";

import { authorize, protect } from "../middleware/protect.js";
import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "../controller/comments.js";

const router = express.Router();

// /api/v1/comments
router
  .route("/")
  .get(getComments)
  .post(protect, authorize("admin", "operator", "user"), createComment);

router
  .route("/:id")
  .get(getComment)
  .put(protect, authorize("admin", "operator", "user"), updateComment)
  .delete(protect, authorize("admin", "operator", "user"), deleteComment);

export default router;
