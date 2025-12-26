import express from "express";
import {
  createReview,
  deleteReview,
  getBookReviews,
  updateReview,
} from "../controller/reviews.js";
import { protect } from "../middleware/protect.js";

const router = express.Router({ mergeParams: true });
// GET /api/v1/books/:bookId/reviews - nomiin reviews
router.route("/").get(getBookReviews).post(protect, createReview);

// PUT/DELETE /api/v1/reviews/:id
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
