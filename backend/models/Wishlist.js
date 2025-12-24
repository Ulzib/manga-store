import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

//neg hereglegch neg Wishlis
WishlistSchema.index({ user: 1 }, { unique: true });

export default mongoose.model("Wishlist", WishlistSchema);
