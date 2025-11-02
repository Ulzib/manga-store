import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import MyError from "../utils/myError.js";
import User from "../models/User.js";

export const protect = asyncHandler(async (req, res, next) => {
  console.log("========== PROTECT MIDDLEWARE ==========");
  console.log("🍪 req.cookies:", req.cookies);
  console.log("📋 All headers:", req.headers);

  let token;

  // ✅ Cookie-с token авах (зөвхөн энэ аргыг л ашиглана)
  if (req.cookies && req.cookies["book-token"]) {
    token = req.cookies["book-token"];
    console.log("✅ Token found in cookies:", token.substring(0, 20) + "...");
  } else {
    console.log("❌ Cookie 'book-token' NOT FOUND!");
    console.log("Available cookies:", Object.keys(req.cookies || {}));
    throw new MyError("Нэвтрэх шаардлагатай! Cookie олдсонгүй.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔓 Token decoded:", decoded);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      console.log("❌ User not found in DB");
      throw new MyError("Хэрэглэгч олдсонгүй", 401);
    }

    console.log("👤 User authenticated:", {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    });
    console.log("========================================\n");

    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    throw new MyError("Токен буруу эсвэл хугацаа дууссан", 401);
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new MyError("Нэвтрэх шаардлагатай", 401);
    }

    console.log(
      `🔐 Authorization check: User="${req.user.role}" vs Required=[${roles}]`
    );

    if (!roles.includes(req.user.role)) {
      throw new MyError(
        `Танд энэ үйлдэл хийх эрх байхгүй. Таны эрх: ${req.user.role}`,
        403
      );
    }

    console.log("✅ Authorization passed\n");
    next();
  };
};
