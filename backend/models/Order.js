import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    //zahialga hiisen user
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Хэрэглэгчийн мэдээлэл шаардлагатай"],
    },
    //zahialsn nomuud
    items: [
      {
        book: {
          type: mongoose.Schema.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    //niit une
    totalAmount: {
      type: Number,
      required: [true, "Нийт үнэ шаардлагатай"],
    },
    //tuluv
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
    },
    //hurgeltiin hayg
    shippingAddress: {
      address: String,
      city: String,
      phone: String,
    },
    //tulburiin medeelel
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "transfer"],
      default: "cash",
    },
    //tulsun eseh
    isPaid: {
      type: String,
      default: false,
    },

    paidAt: Date,

    //Date
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJson: { virtual: true },
    toObject: { virtual: true },
  }
);

export default mongoose.model("Order", OrderSchema);
