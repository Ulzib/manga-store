import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controller/categories.js";
// /api/v1/categories/:id/books
import { getCategoryBooks } from "../controller/books.js";
import { authorize, protect } from "../middleware/protect.js";

const router = express.Router();

router.route("/:categoryId/books").get(getCategoryBooks);

// /api/v1/categories
router
  .route("/")
  .get(getCategories)
  .post(protect, authorize("admin"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin", "operator"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

export default router;
