import MyError from "../utils/myError.js";
import asyncHandler from "express-async-handler";
import paginateSequelize from "../utils/paginate-sequelize.js";

//mysql-tei ajillah

export const createComment = asyncHandler(async (req, res, next) => {
  //shineer comment uusgeh/ postman
  const comment = await req.db.comment.create(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// /api/comments/:id
export const updateComment = asyncHandler(async (req, res, next) => {
  //comment huleej avna
  let comment = await req.db.comment.findByPk(req.params.id);

  //bhgui bol
  if (!comment) {
    throw new Error(`${req.params.id} id тэй коммент олдсонгүй.`, 400);
  }
  //uurchilnu
  comment = await comment.update(req.body);

  res.status(200).json({
    success: true,
    data: comment,
  });
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  //comment huleej avna, haij olno
  let comment = await req.db.comment.findByPk(req.params.id);

  //bhgui bol
  if (!comment) {
    throw new Error(`${req.params.id} id тэй коммент олдсонгүй.`, 400);
  }
  //ustgana
  await comment.destroy();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

export const getComment = asyncHandler(async (req, res, next) => {
  //comment huleej avna, haij olno
  let comment = await req.db.comment.findByPk(req.params.id);

  //bhgui bol
  if (!comment) {
    throw new Error(`${req.params.id} id тэй коммент олдсонгүй.`, 400);
  }

  res.status(200).json({
    success: true,
    user: await comment.getUser(),
    // book: await comment.getBook(),
    data: comment,
  });
});

export const getComments = asyncHandler(async (req, res, next) => {
  //page,limit,sort,select-iig damjuulaad queryObj-r ustgah
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const sort = req.query.sort;
  let select = req.query.select;

  if (select) {
    select = select.split(" ");
  }

  const queryObj = { ...req.query };
  ["select", "sort", "page", "limit"].forEach((el) => delete queryObj[el]);
  ///
  // Pagination
  const pagination = await paginateSequelize(page, limit, req.db.comment);
  ///
  let query = { offset: pagination.start - 1, limit };

  //query bval nemne
  if (queryObj) {
    query.where = queryObj;
  }

  if (select) {
    query.attributes = select;
  }

  if (sort) {
    query.order = sort
      .split(" ")
      .map((el) => [
        el.charAt(0) === "-" ? el.substring(1) : el,
        el.charAt(0) === "-" ? "DESC" : "ASC",
      ]);
  }

  const comments = await req.db.comment.findAll(query);

  res.status(200).json({
    success: true,
    data: comments,
    pagination,
  });
});

//lazy loading
//user-uuding bichsn commentuudig duudna
export const getUserComments = asyncHandler(async (req, res, next) => {
  //user huleej avna, haij olno
  let user = await req.db.user.findByPk(req.params.id);

  //bhgui bol
  if (!user) {
    throw new Error(`${req.params.id} id тэй хэрэглэгч олдсонгүй.`, 400);
  }

  //user-iin commentuudiig gargj ireh
  const comments = await user.getComments();

  res.status(200).json({
    success: true,
    user,
    comments,
  });
});

//Eager loading
//nomuudiin bichsn commentudig duudna
export const getBookComments = asyncHandler(async (req, res, next) => {
  //user huleej avna, haij olno
  let book = await req.db.book.findByPk(
    req.params.id,
    //nomuudin com avchir
    {
      include: req.db.comment,
    }
  );

  //bhgui bol
  if (!book) {
    throw new Error(`${req.params.id} id тэй ном олдсонгүй.`, 400);
  }

  res.status(200).json({
    success: true,
    book,
    // comments,
  });
});
