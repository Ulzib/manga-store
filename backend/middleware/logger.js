const logger = (req, res, next) => {
  const method = req.method;
  const protocol = req.protocol; // http эсвэл https
  const host = req.get("host"); // localhost:8000 гэх мэт, порттойгоо буцаана
  const url = req.originalUrl;

  next();
};

export default logger;
