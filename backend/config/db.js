import mongoose from "mongoose";
import colors from "colors";
//mongoose-iin mongodb-tei holbogdh
const connectDB = async () => {
  try {
    // Mongoose 6+ дээр эдгээр options шаардлагагүй болсон
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB холбогдлоо : ${conn.connection.host}`.cyan.bold);
  } catch (error) {
    console.error(`MongoDB холболт амжилтгүй боллоо: ${error}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
