import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    //tailbar
    text: {
      type: String,
      required: [true, "Тайлбар оруулна уу"],
      maxLength: 500,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

//neg user neg nomond neg uda rating ugnu
ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

export default mongoose.model("Review", ReviewSchema);
