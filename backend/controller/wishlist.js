import Wishlist from "../models/Wishlist.js";
import Book from "../models/Book.js";
import asyncHandler from "express-async-handler";
import MyError from "../utils/myError.js";

//guest-iin hooson wishlist object
const guestWishlist = { _id: null, user: "guest", books: [] };

//get  /api/v1/wishlist - minii wishlist avah
export const getWishlist = asyncHandler(async (req, res, next) => {
  //guest bl db-d handahgui
  if (req.user._id === "guest") {
    return res.status(200).json({ success: true, data: guestWishlist });
  }
  //////
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
    path: "books",
    select: "name price photo author",
  });

  //wishlist bhgu bl hooson uusgene
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, books: [] });
  }

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

//post /api/v1/wishlist/:bookId - nom nemeh
export const addToWishlist = asyncHandler(async (req, res, next) => {
  //guest bl db-d hadgalahgui - frontend state-d bn
  if (req.user._id === "guest") {
    return res.status(200).json({ success: true, data: guestWishlist });
  }
  const book = await Book.findById(req.params.bookId);
  if (!book) {
    throw new MyError("Манга олдсонгүй", 404);
  }

  let wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: req.user._id,
      books: [req.params.bookId],
    });
  } else {
    // ali hediin bga esehiig check
    if (wishlist.books.includes(req.params.bookId)) {
      throw new MyError("Энэ манга аль хэдийн жагсаалтад байна", 400);
    }
    wishlist.books.push(req.params.bookId);
    await wishlist.save();
  }

  await wishlist.populate({ path: "books", select: "name price photo" });

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

//delete /api/v1/wishlist/:bookId - nom hasah
export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  if (req.user._id) {
    return res.status(200).json({ success: true, data: guestWishlist });
  }
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    throw new MyError("Жагсаалтад олдсонгүй", 404);
  }

  wishlist.books = wishlist.books.filter(
    (id) => id.toString() !== req.params.bookId,
  );

  await wishlist.save();
  await wishlist.populate({ path: "books", select: "name price photo" });

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});
