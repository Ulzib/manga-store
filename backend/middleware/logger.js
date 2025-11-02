const logger = (req, res, next) => {
  console.log("---------Cookies: ", req.cookies);
  console.log("========== REQUEST INFO ==========");
  console.log("🍪 Cookies:", req.cookies);
  console.log("📋 Method:", req.method);
  console.log(
    "🔗 URL:",
    `${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  console.log("==================================");
  const method = req.method;
  const protocol = req.protocol; // http эсвэл https
  const host = req.get("host"); // localhost:8000 гэх мэт, порттойгоо буцаана
  const url = req.originalUrl;

  console.log(`${method} ${protocol}://${host}${url}`);
  next();
};

export default logger;
