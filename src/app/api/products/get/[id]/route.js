
import { authDB } from "@/database/authDB";
import Product from "@/models/Product";
 

export async function GET(req, { params }) {
  await authDB();

  try {
    const { id } = await params;
    if (!id) return new Response("Missing ID", { status: 400 });

    const product = await Product.findById(id);
    if (!product) return new Response("Product not found", { status: 404 });

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return new Response("Server error", { status: 500 });
  }
}