import { authDB } from "@/database/authDB";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  await authDB();
  try {
    const { orderId } = await req.json();
    console.log("Received orderId:", orderId);

    if (!orderId) {
      return NextResponse.json({ success: false, message: "orderId is missing" }, { status: 400 });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    // Update without triggering full schema validation
    await Order.findOneAndUpdate(
      { orderId },
      {
        status: "Cancelled",
        product: []
      },
      { runValidators: false }
    );

    return NextResponse.json({ success: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error canceling order:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
