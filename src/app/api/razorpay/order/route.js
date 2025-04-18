 import { NextResponse } from "next/server";
export async function POST(req) {
    try {
      const { amount } = await req.json();
      console.log("Received amount:", amount); // Debugging
  
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            process.env.RAZORPAY_KEY_ID + ":" + process.env.RAZORPAY_KEY_SECRET
          ).toString("base64")}`,
        },
        body: JSON.stringify({
          amount: amount * 100,
          currency: "INR",
          receipt: "receipt#1",
        }),
      });
  
      const data = await response.json();
      console.log("Razorpay Response:", data); // Debugging
  
      if (!response.ok) {
        console.error("Razorpay Error:", data.error);
        return NextResponse.json({ success: false, message: data.error.description }, { status: 500 });
      }
  
      return NextResponse.json({ success: true, order: data }, { status: 200 });
  
    } catch (error) {
      console.error("Server Error:", error.message);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
  