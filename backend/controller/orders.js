import asyncHandler from "express-async-handler";
import { paginate } from "../utils/paginate.js";

import MyError from "../utils/myError.js";
import Book from "../models/Book.js";
import Order from "../models/Order.js";

//get /api/v1/orders buh zahialga admin
export const getOrders = asyncHandler(async (req, res, next) => {
  const page = parseInt(req, res, next) || 1;
  const limit = parseInt(req, res, next) || 10;
  const sort = req.query.sort || "-createdAt"; //shine ehend

  const queryObj = { ...req.query };
  ["select", "sort", "page", "limit"].forEach((el) => delete queryObj[el]);

  //pagination
  const pagination = await paginate(page, limit, Order);

  //zahialga tatah, populate(user, items.book)
  const orders = await Order.find(queryObj)
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "items.book",
      select: "name price photo",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
    pagination,
  });
});

//get /api/v1/orders/:id - 1 zahialga
export const getOrder = asyncHandler(async (req, res, next) => {
  const order = Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("items.book", "name price photo");

  if (!order) {
    throw new MyError(req.params.id + " ID-тэй захиалга байхгүй!", 404);
  }

  res.status(200).json({
    success: true,
    data: order,
  });
});

//post /api/v1/orders - zahialga uusgeh (User)
export const createOrder = asyncHandler(async (req, res, next) => {
  //nevtersn eseh shalgh
  if (!req.user || !req.user._id) {
    throw new MyError("Нэвтэрч орох шаардлагатай!", 401);
  }
  const { items, shippingAddress, paymentMethod } = req.body;

  //zahialgiin items shalgh
  if (!items || items.length === 0) {
    throw new MyError("Захиалга хоосон байна!", 400);
  }

  //nomuudiig tatah ba une tootsoh
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const book = await Book.findById(item.book);

    if (!book) {
      throw new MyError(`${item.book} ID-тэй ном олдсонгүй!`, 404);
    }

    orderItems.push({
      book: book._id,
      quantity: item.quantity,
      price: book.price,
    });

    totalAmount += book.price * item.quantity;
  }

  //zahialga uusgeh
  const order = Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
  });

  res.status(200).json({
    success: true,
    data: order,
  });
});

//put /api/v1/orders/:id - admin zahialga refresh
export const updateOrder = asyncHandler(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order) {
    throw new MyError(req.params.id + " ID-тэй захиалга байхгүй!", 404);
  }
  //tuluv shinechleh
  if (req.body.status) {
    order.status = req.body.status;
  }
  //tulbur batalgaajuulh
  if (req.body.isPaid) {
    order.isPaid = true;
    order.paidAt = Date.now();
  }
  await order.save();

  res.status(200).json({
    success: true,
    data: order,
  });
});

//delete /ap/v1/order/:id admin
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new MyError(req.params.id + " ID-тэй захиалга байхгүй!", 404);
  }
  await order.deleteOne();

  res.status(200).json({
    sucess: true,
    data: order,
  });
});

//get /api/v1/orders/my minii zahialguud user
export const getMyOrders = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user._id) {
    throw new MyError("Нэвтэрч орох шаардлагатай!", 401);
  }

  const orders = await Order.find({ user: req.user._id })
    .populate("items.book", "name price photo")
    .sort("-createdAt");

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders,
  });
});
