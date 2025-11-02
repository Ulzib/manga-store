import User from "../models/User.js";
import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import { paginate } from "../utils/paginate.js";
import sendMail from "../utils/email.js";
import crypto from "crypto";
//register hiine
export const register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  //jwt token-oo end duudaj bn
  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});

//login hiine
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //orolt shalgana
  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ дамжуулна уу!", 400);
  }

  //tuhain hereglegchiig haina
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу!", 401);
  }

  //passwordoo shalgana
  const ok = await user.checkPassword(password);

  if (!ok) {
    throw new MyError("Имэйл болон нууц үгээ зөв оруулна уу!", 401);
  }

  // ✅ Token үүсгэх - энд байх ёстой
  const token = user.getJsonWebToken();

  // ✅ Cookie тохиргоо
  const cookieOptions = {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 хоног
    sameSite: "lax",
    secure: false,
    path: "/",
  };

  console.log("✅ Setting cookie for user:", user.email);

  // ✅ Cookie set хийж response буцаах
  res
    .cookie("book-token", token, cookieOptions)
    .status(200)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
});

//logout
export const logout = asyncHandler(async (req, res, next) => {
  console.log("✅ Clearing cookie");

  res
    .clearCookie("book-token", {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
      path: "/",
    })
    .status(200)
    .json({
      success: true,
      message: "Амжилттай гарлаа",
    });
});

//////////////users-iin crud///////////////////////////////////////////

export const getUsers = asyncHandler(async (req, res, next) => {
  //page,limit,sort,select-iig damjuulaad queryObj-r ustgah
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort;
  const select = req.query.select;

  const queryObj = { ...req.query };
  ["select", "sort", "page", "limit"].forEach((el) => delete queryObj[el]);
  ///
  // Pagination
  const pagination = await paginate(page, limit, User);
  ///

  const users = await User.find(queryObj, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: users,
    pagination,
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй!", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй.", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  //model-s id-r ni barij avna
  const user = await User.findById(req.params.id);
  //oldhgui bol error shidne
  if (!user) {
    throw new MyError(req.params.id + " ID-тэй хэрэглэгч байхгүй.", 400);
  }
  //avsan id-r ni ustgana
  await user.deleteOne();
  //ustgasn user-iinhe medeellig butsaana
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new MyError("Та нууц үг сэргээх имэйл хаягаа дамжуулна уу", 400);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new MyError(req.body.email + " имэйлтэй хэрэглэгч олдсонгүй!", 400);
  }

  const resetToken = user.generatePasswordChangeToken();
  await user.save();

  // await user.save({ validateBeforeSave: false });

  //email ilgeene
  const link = `http://amazon.mn/changepassword/${resetToken}`;

  const message = `Сайн байна уу<br><br>Та нууц үгээ солих хүсэлт илгээлээ.<br> Нууц үгээ доорхи линк дээр дарж солино уу:<br><br><a href= "${link}">${link}</a>`;

  await sendMail({
    email: user.email,
    subject: "Нууц үг өөрчлөх хүсэлт",
    message,
  });

  res.status(200).json({
    success: true,
    resetToken,
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.resetToken || !req.body.password) {
    throw new MyError("Та нууц үг сэргээх имэйл хаягаа дамжуулна уу", 400);
  }

  const encrypted = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: encrypted,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new MyError("Токен хүчингүй байна!", 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const token = user.getJsonWebToken();

  res.status(200).json({
    success: true,
    token,
    user: user,
  });
});
