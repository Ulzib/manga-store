import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

import path from "path";
import book from "../models/sequelize/book.js";
import user from "../models/sequelize/user.js";
import comment from "../models/sequelize/comment.js";
import category from "../models/sequelize/category.js";

let db = {};

dotenv.config({ path: path.resolve("config/config.env") });

console.log("Dialect:", process.env.SEQUELIZE_DIALECT);

//database-iin buh medeeleltei fn
const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_USER_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    define: {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },

    logging: process.env.NODE_ENV === "development" ? console.log : false,
  }
);

//model-oo holboh
const models = [book, user, comment, category];
//course, teacher 2 davtaad grgj bn
models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});

db.sequelize = sequelize;

export default db;
