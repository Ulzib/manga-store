import fs from "fs";
import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Book from "./models/Book.js";
import path from "path";
import { fileURLToPath } from "url";
import User from "./models/User.js";

dotenv.config({ path: "./config/config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGODB_URI);

const categories = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/data/categories.json"), "utf-8")
);

const books = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/data/book.json"), "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/data/user.json"), "utf-8")
);

const importData = async () => {
  try {
    await Category.create(categories);
    await Book.create(books);
    await User.create(users);
    console.log("Өгөгдлийг импортлолоо....".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Category.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();
    console.log("Өгөгдлийг бүгдийг устгалаа....".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
