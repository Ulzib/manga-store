import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import MyError from "../utils/myError.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Cookie-s token avah
  if (req.cookies && req.cookies["book-token"]) {
    token = req.cookies["book-token"];
  } //Authorization header-s avah (mobile-d cookie ajillahgui bol)
  else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new MyError("Нэвтрэх шаардлагатай! Cookie олдсонгүй.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      throw new MyError("Хэрэглэгч олдсонгүй", 401);
    }
    next();
  } catch (err) {
    throw new MyError("Токен буруу эсвэл хугацаа дууссан", 401);
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new MyError("Нэвтрэх шаардлагатай", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new MyError(
        `Танд энэ үйлдэл хийх эрх байхгүй. Таны эрх: ${req.user.role}`,
        403,
      );
    }

    next();
  };
};
