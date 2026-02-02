import mongoose from "mongoose";
import { transliterate, slugify } from "transliteration";

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Номын нэрийг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [250, "Номын нэрний урт дээд тал нь 250 тэмдэгт байх ёстой."],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    author: {
      type: String,
      required: [true, "Зохиогчийн нэрийг оруулна уу"],
      trim: true,
      maxlength: [
        50,
        "Зохиогчийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой.",
      ],
    },
    averageRating: {
      type: Number,
      min: [0, "Рэйтинг хамгийн багадаа 0 байх ёстой"],
      max: [5, "Рэйтинг хамгийн ихдээ 10 байх ёстой"],
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Номны үнийг оруулна уу"],
      min: [500, "Номын үнэ хамгийн багадаа 500 төгрөг байх ёстой"],
    },
    balance: Number,
    description: {
      type: String,
      required: [true, "Номын тайлбарыг оруулна уу"],
      trim: true,
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    available: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },

    createdUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    updatedUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

//dundaj uniig oldog middleware, mongoose static fn
BookSchema.statics.computeCategoryAveragePrice = async function (catId) {
  const obj = await this.aggregate([
    { $match: { category: catId } },
    { $group: { _id: "$category", avgPrice: { $avg: "$price" } } },
  ]);
  console.log(obj);

  let avgPrice = null;

  if (obj.length > 0) avgPrice = obj[0].avgPrice;

  await this.model("Category").findByIdAndUpdate(catId, {
    averagePrice: avgPrice,
  });

  return obj;
};

//save hiih blgoni dra deerh aggregate fn ajillana
BookSchema.post("save", function () {
  this.constructor.computeCategoryAveragePrice(this.category);
});

//delete hiih blgoni dra deerh aggregate fn ajillana
BookSchema.post("deleteOne", { document: true, query: false }, function () {
  this.constructor.computeCategoryAveragePrice(this.category);
});

BookSchema.virtual("zohiogch").get(function () {
  if (!this.author) return "";
  // this.author
  let tokens = this.author.split(" ");
  if (tokens.length === 1) tokens = this.author.split(".");
  if (tokens.length === 2) return tokens[1];

  return tokens[0];
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
