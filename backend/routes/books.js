import express from "express";
import {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
  uploadBookPhoto,
} from "../controller/books.js";
import { authorize, protect } from "../middleware/protect.js";
import { getBookComments } from "../controller/comments.js";
const router = express.Router();

// "/api/v1/books"
router
  .route("/")
  .get(getBooks)
  .post(protect, authorize("admin", "operator"), createBook);

router
  .route("/:id")
  .get(getBook) // ✅ Бүх хүн харна - protect ХЭРЭГГҮЙ
  .put(protect, updateBook) // ✅ ЗАСВАР: authorize хасав - controller дотор шалгана
  .delete(protect, deleteBook); // ✅ ЗАСВАР: authorize хасав - controller дотор шалгана

router
  .route("/:id/upload-photo")
  .put(protect, authorize("admin", "operator"), uploadBookPhoto);

router.route("/:id/comments").get(getBookComments);

export default router;
