import express from "express";
import { protect, authorize } from "../middleware/protect.js";
import {
  createOrder,
  deleteOrder,
  getMyOrders,
  getOrder,
  getOrders,
  updateOrder,
} from "../controller/orders.js";

const router = express.Router();

// /api/v1/orders/my - mni zahialguud(login hiisn user)
router.route("/my").get(protect, getMyOrders);

// /api/v1/orders

router
  .route("/")
  .get(protect, authorize("admin", "operator"), getOrders) // admin l harna
  .post(protect, createOrder); // hen ch zahialga uusgej blno

// /api/v1/orders/:id
router
  .route("/:id")
  .get(protect, getOrder)
  .put(protect, authorize("admin", "operator"), updateOrder)
  .delete(protect, authorize("admin", "operator"), deleteOrder);

export default router;
