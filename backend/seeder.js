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
  fs.readFileSync(path.join(__dirname, "/data/categories.json"), "utf-8"),
);

const books = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/data/book.json"), "utf-8"),
);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "/data/user.json"), "utf-8"),
);

const importData = async () => {
  try {
    // Users uusgh
    const createdUsers = await User.create(users);
    console.log("Users imported...".cyan);

    // Categories uusgh
    const createdCategories = await Category.create(categories);
    console.log("Categories imported...".cyan);

    // Category nereer ID map uusgh
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    console.log("Category Map:", categoryMap);

    // Books dr category holboh
    const booksWithCategory = books.map((book) => {
      // nomiin nereer category todorhoiloh
      let categoryName = "Инээдэм"; // Default

      // crime
      if (
        [
          "Demon Slayer (Чөтгөрийн ангууч)",
          "Jujutsu Kaisen (Хар шидийн сургууль)",
          "Bleach (Блич)",
          "Sakamoto Days (Сакамотон өдрүүд)",
          "Chainsaw Man (Хөрөөт эр)",
          "Tokyo Ghoul (Токиогийн Гөүл)",
        ].includes(book.name)
      ) {
        categoryName = "Гэмт хэрэг, тулаант";
      }
      // sport
      else if (
        [
          "Haikyu (Хаикюү)",
          "Slam dunk (Слэм данк)",
          "Hajime no ippo (Хажимэ но иппо - Эхний алхам)",
          "Captain Tsubasa (Ахмад Цүбаса)",
          "Touch (Хүр)",
          "Kuroko's basketball (Курокогийн сагсан бөмбөг)",
          "Blue Lock (Блюү Лок)",
        ].includes(book.name)
      ) {
        categoryName = "Спорт";
      }
      // adventure
      else if (
        [
          "Луут бөмбөлөг (Dragon ball)",
          "Naruto (Наруто)",
          "One piece (Ван Пийс)",
          "Yu Yu Hakusho (Юү Юү Хакүшёо)",
          "Yu-Gi-Oh (Юү Ги О)",
          "Pokimon (Покимон)",
          "Hunter X Hunter (Ангуучид)",
          "My hero Academia (Миний баатрын сургууль)",
        ].includes(book.name)
      ) {
        categoryName = "Адал явдал";
      }

      // Category ID holboh
      book.category = categoryMap[categoryName];

      // User ID holboh (ehnii user)
      book.createdUser = createdUsers[0]._id;
      book.updatedUser = createdUsers[0]._id;

      return book;
    });

    // Books oruulah
    await Book.create(booksWithCategory);
    console.log("Books imported...".cyan);

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
