import express from "express";
import {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  forgotPassword,
  resetPassword,
  logout,
} from "../controller/users.js";
import { getUserBooks } from "../controller/books.js";
import { protect, authorize } from "../middleware/protect.js";
import { getUserComments } from "../controller/comments.js";

const router = express.Router();

router.post(
  "/logout",
  (req, res, next) => {
    next();
  },
  logout
);

//register
router.route("/register").post(register);

//login gdg route dr post hiivel login fn ajillana
router.route("/login").post(login);

router.route("logout").post(logout);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

//ene murnuus doosh buh huseltuuded protect-iig hereglene
router.use(protect);

// "/api/v1/users"
router
  .route("/")
  .get(authorize("admin"), getUsers)
  .post(authorize("admin"), createUser);

router
  .route("/:id")
  .get(authorize("admin", "operator"), getUser)
  .put(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

router
  .route("/:id/books")
  .get(authorize("admin", "operator", "user"), getUserBooks);

router.route("/:id/comments").get(getUserComments);

export default router;
