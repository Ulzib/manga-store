import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controller/wishlist.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getWishlist);
router.route("/:bookId").post(addToWishlist).delete(removeFromWishlist);

export default router;
