import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";
import Book from "../models/Book.js";
import MyError from "../utils/myError.js";

// get /api/v1/books/:bookId/reviews - nomiin buh review
export const getBookReviews = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bookId) {
    query = Review.find({ book: req.params.bookId });
  } else {
    // 2. Хэрэв /api/v1/reviews гэж дуудвал БҮХ үнэлгээг авна
    query = Review.find();
  }
  const reviews = await query
    .populate({
      path: "user",
      select: "name",
    })
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  });
});

// post /api/v1/books/:bookId/reviews - Review nemeh
export const createReview = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    throw new MyError("Ном олдсонгүй", 404);
  }

  //ali hediin review ugsun esehiig check
  const existing = await Review.findOne({
    book: req.params.bookId,
    user: req.user._id,
  });

  if (existing) {
    throw new MyError("Та энэ номонд аль хэдийн үнэлгээ өгсөн байна", 400);
  }

  const review = await Review.create({
    text: req.body.text,
    rating: req.body.rating,
    book: req.params.bookId,
    user: req.user._id,
  });

  await review.populate({ path: "user", select: "name" });

  res.status(201).json({
    success: true,
    data: review,
  });
});

// put /api/v1/reviews/:id - Review zasah
export const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    throw new MyError("Үнэлгээ олдсонгүй", 404);
  }

  //zuvhun uuriin review zasna
  if (review.user.toString() !== req.user._id.toString()) {
    throw new MyError("Та зөвхөн өөрийн үнэлгээг засах эрхтэй", 403);
  }
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate({ path: "user", select: "name" });

  res.status(200).json({
    success: true,
    data: review,
  });
});

// delete /api/v1/reviews/:id - Review ustgah
export const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new MyError("Үнэлгээ олдсонгүй", 404);
  }

  //zuvhun uuriin review esvel admin ustgana
  const isOwner = review.user.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new MyError("Та энэ үйлдлийг хийх эрхгүй байна", 403);
  }

  await review.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
