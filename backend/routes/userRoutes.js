import express from "express";
import {
  register,
  login,
  logout,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
