import mongoose from "mongoose";

const OrderSchema =  mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderId: { type: String, required: true },
    paymentId: { type: String, required: true },
    products: [
      {
       _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true }, // ✅ Ensure this is present
        image: { type: Object, required: true },
        size: { type: String, required: true }
      },
    ],
    totalAmount: { type: Number, required: true },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: { type: String, enum: ["Pending","Paid",  "Cancelled" , "Failed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.orders || mongoose.model("orders", OrderSchema);