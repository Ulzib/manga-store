import Book from "../models/Book.js";
import path from "path";
import Category from "../models/Category.js";
import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import { paginate } from "../utils/paginate.js";
import User from "../models/User.js";

// api/v1/books
export const getBooks = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const sort = req.query.sort;
  const select = req.query.select;

  const queryObj = { ...req.query };
  ["select", "sort", "page", "limit"].forEach((el) => delete queryObj[el]);
  ///
  // Pagination
  const pagination = await paginate(page, limit, Book);

  let query = Book.find(queryObj);
  if (select) {
    query = query.select(select);
  }
  const books = await query
    .populate({
      path: "category",
      select: "name averagePrice",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
    pagination,
  });
});

export const getUserBooks = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    throw new MyError("Нэвтрэх шаардлагатай!", 401);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  const queryObj = { ...req.query };
  ["select", "sort", "page", "limit"].forEach((el) => delete queryObj[el]);
  ///
  // Pagination
  const pagination = await paginate(page, limit, Book);

  queryObj.createdUser = req.user._id;

  let query = Book.find(queryObj);
  if (select) {
    query = query.select(select);
  }
  const books = await query
    .populate({
      path: "category",
      select: "name averagePrice",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
    pagination,
  });
});

// api/v1/categories/:catId/books
export const getCategoryBooks = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const sort = req.query.sort;
  const select = req.query.select;

  const queryObj = { ...req.query };
  ["select", "sort", "page", "limit"].forEach((el) => delete queryObj[el]);

  ///Category ID nemeh
  queryObj.category = req.params.categoryId;

  // Pagination
  const pagination = await paginate(page, limit, Book);

  let query = Book.find(queryObj);

  if (select) {
    query = query.select(select);
  }

  const books = await query
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
    pagination,
  });
});

export const getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate({
    path: "category",
    select: "name",
  });
  if (!book) {
    throw new MyError(req.params.id + "ID-тэй ном алга байна", 404);
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

//note: params ni url damjigdj bga tohioldold avna

export const createBook = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    throw new MyError("Нэвтрэх шаардлагатай!", 401);
  }

  const category = await Category.findById(req.body.category);

  if (!category) {
    throw new MyError(req.body.category + "ID-тэй категори алга байна", 400);
  }

  req.body.createdUser = req.user._id;

  const book = await Book.create(req.body);

  res.status(200).json({
    success: true,
    data: book,
  });
});

export const deleteBook = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    throw new MyError("Нэвтрэх шаардлагатай!", 401);
  }

  const book = await Book.findById(req.params.id);
  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном алга байна", 404);
  }

  //  ЗАСВАР: Эрхийн шалгалт
  const isAdmin = req.user.role === "admin" || req.user.role === "operator";
  const isOwner =
    book.createdUser && book.createdUser.toString() === req.user._id.toString();

  console.log("🗑️ Delete authorization:", {
    isAdmin,
    isOwner,
    userRole: req.user.role,
    bookCreatedUser: book.createdUser,
    currentUserId: req.user._id,
  });

  if (!isAdmin && !isOwner) {
    throw new MyError("Та зөвхөн өөрийн номыг устгах эрхтэй", 403);
  }

  await book.deleteOne();

  res.status(200).json({
    success: true,
    data: book,
    deletedUser: req.user.name,
  });
});

export const updateBook = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    throw new MyError("Нэвтрэх шаардлагатай!", 401);
  }

  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй.", 400);
  }

  // ✅ ЗАСВАР: Эрхийн шалгалт
  const isAdmin = req.user.role === "admin" || req.user.role === "operator";
  const isOwner =
    book.createdUser && book.createdUser.toString() === req.user._id.toString();

  console.log("📝 Update authorization:", {
    isAdmin,
    isOwner,
    userRole: req.user.role,
    bookCreatedUser: book.createdUser,
    currentUserId: req.user._id,
  });

  if (!isAdmin && !isOwner) {
    throw new MyError("Та зөвхөн өөрийн номыг засварлах эрхтэй", 403);
  }

  // ✅ ЗАСВАР: req.userId → req.user._id
  req.body.updatedUser = req.user._id;

  // Давталт дуусах хүртэл утгыг book руу хийнэ
  for (let attr in req.body) {
    book[attr] = req.body[attr];
  }

  await book.save();

  res.status(200).json({
    success: true,
    data: book,
  });
});
//PUT : api/v1/books/:id/photo

export const uploadBookPhoto = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй.", 400);
  }
  if (!req.files || !req.files.file) {
    throw new MyError("Upload hiine uu!", 400);
  }

  //image upload

  const file = req.files.file;
  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Ta zurag upload hiine uu!", 400);
  }

  //file size
  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Tany zuragnii hemjee hetersen bn", 400);
  }

  //buh upload hiisn zurgiin neree photo gdg standart nertei bolgoj bn
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  //file upload path gsn folderiin filename bolgj huul
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      throw new MyError(
        "File-iig huulah yavtsad aldaa garlaa! Aldaa : " + err.message,
        400
      );
    }

    //nomiin neriig ugugdliin sand uurchluh/ talbart ni utga uguud save hiine
    book.photo = file.name;
    await book.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
