import mongoose from "mongoose";
import { transliterate, slugify } from "transliteration";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Категорийн нэрийг оруулна уу"],
      unique: true,
      trim: true,
      maxlength: [
        50,
        "Категорийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой.",
      ],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Категорийн тайлбарыг заавал оруулах ёстой."],
      maxlength: [
        500,
        "Категорийн тайлбарын урт дээд тал нь 500 тэмдэгт байх ёстой1111.",
      ],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    averageRating: {
      type: Number,
      min: [1, "Рэйтинг хамгийн багадаа 1 байх ёстой"],
      max: [10, "Рэйтинг хамгийн ихдээ 10 байх ёстой"],
    },
    averagePrice: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

CategorySchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

CategorySchema.pre("deleteOne", { document: true }, async function (next) {
  console.log("removing books for category:", this._id);
  const result = await this.model("Book").deleteMany({ category: this._id });
  console.log(`${result.deletedCount} ном устгагдлаа`);
  next();
});

CategorySchema.pre("save", function (next) {
  // name хөрвүүлэх
  this.slug = slugify(this.name);
  this.averageRating = Math.floor(Math.random() * 10) + 1;
  // this.averagePrice = Math.floor(Math.random() * 100000) + 3000;
  next();
});

export default mongoose.model("Category", CategorySchema);
