import express from "express";
import dotenv from "dotenv";
import path from "path";
import rfs from "rotating-file-stream";
import morgan from "morgan";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import fileUpload from "express-fileupload";
// Router оруулж ирэх
import categoriesRoutes from "./routes/categories.js";
import booksRoutes from "./routes/books.js";
import usersRoutes from "./routes/users.js";
import commentsRoutes from "./routes/comments.js";

// __dirname тохируулах (ESM-д)
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from "cors";
// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: path.join(__dirname, ".env") });

import cookieParser from "cookie-parser";
import ordersRoutes from "./routes/orders.js";
import wishlistRoutes from "./routes/wishlist.js";
import reviewRoutes from "./routes/reviews.js";

const app = express();

connectDB();
//body dahi ugugdliig json bolgon
app.use(express.json());
//cookie bval req.cookie ruu oruulj ugnu
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true, //busad cookie-r irj bga medeellig huleej avah
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(logger);

// create a write stream (in append mode)
const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // өдөр тутам rotate хийх
  path: path.join(__dirname, "log"),
});

// Body parser
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true, // хавтас байхгүй бол автоматаар үүсгэнэ
  }),
);

//mongo security serguuleh
// app.use(ExpressMongoSanitize());
// app.use(helmet());
// app.use(xss());
// //duudaltiin toog limitlene
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, //15 minutes
//   max: 5, //limit IP to 100 req
//   message: "15min 5 udaa duudaj blno",
// });
// app.use(limiter);

app.use(morgan("combined", { stream: accessLogStream }));

// server.js дээр routes-аас ӨМНӨ нэмэх
app.use((req, res, next) => {
  console.log(`\n🌐 ${req.method} ${req.originalUrl}`);
  console.log("🍪 Cookies:", req.cookies);
  console.log(
    "👤 req.user:",
    req.user ? `ID=${req.user._id}, Role=${req.user.role}` : "undefined",
  );
  next();
});

app.get("/", (req, res) => {
  res.send("API is running... 🚀");
});
//zurag
app.use("/uploads", express.static(path.join(__dirname, "public/upload")));

// Routes, categories,books,users gd rhlrh l ym bol hoino bga fn ni hariutsna
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/books", booksRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/orders", ordersRoutes);
// app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/reviews", reviewRoutes);
// Error handler
app.use(errorHandler);

const server = app.listen(process.env.PORT, () =>
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `),
);

// Unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`.underline.red.bold);
  server.close(() => process.exit(1));
});
