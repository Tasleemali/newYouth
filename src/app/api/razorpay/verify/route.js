import { NextResponse } from "next/server";
import crypto from "crypto";
import mongoose from "mongoose";
import { authDB } from "@/database/authDB";
import Order from "@/models/Order";

export async function POST(req) {
  await authDB(); // Ensure MongoDB connection

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      carts,
      totalAmount,
      name,
      email,
      contact,
      address,
    } = await req.json();

    console.log("🔍 Received Data:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      carts,
      totalAmount,
      name,
      email,
      contact,
      address,
    });

    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("⚠️ Missing Razorpay Secret Key in ENV");
    }

    // ✅ Payment Signature Verification
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed!" },
        { status: 400 }
      );
    }

    // ✅ Ensure cartItems have valid ObjectId
    const validCartItems = carts.map((item) => ({
      _id: mongoose.Types.ObjectId.isValid(item._id)
        ? new mongoose.Types.ObjectId(item._id)
        : new mongoose.Types.ObjectId(), // ✅ Convert _id to ObjectId
      name: item.name,
      price: item.price,
      qty: item.qty || 1, // ✅ Ensure qty is included
      size: item.size,
      image: item.mainImage,
    }));

    // ✅ Save Order
    const newOrder = new Order({
      name,
      email,
      contact,
      address,
      userId,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      products: validCartItems,
      totalAmount,
      // address: address || { street: "N/A" }, // Ensure valid address
      status: "Paid",
    });

    await newOrder.save();
    console.log("✅ Order Saved Successfully!");

    return NextResponse.json({ success: true, message: "Order saved successfully!" });
  } catch (error) {
    console.error("❌ Order Save Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
