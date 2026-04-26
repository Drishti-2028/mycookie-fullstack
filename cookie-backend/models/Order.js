const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    name:    { type: String, required: true },
    address: { type: String, required: true },
    items: [
      {
        id:    { type: String,  required: true },
        name:  { type: String,  required: true },
        price: { type: Number,  required: true },
        qty:   { type: Number,  required: true },
      },
    ],
    total:             { type: Number, required: true },
    status:            { type: String, default: "pending" },
    paymentStatus:     { type: String, default: "unpaid" },
    razorpayOrderId:   { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    razorpaySignature: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);