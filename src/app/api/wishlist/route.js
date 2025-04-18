import { authDB } from "@/database/authDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// ✅ Helper function to get user from token
async function getUserIdFromToken(req) {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

// ✅ Get Wishlist
export async function GET(req) {
    await authDB();
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await User.findById(userId).populate("wishlist");
    return NextResponse.json({ wishlist: user?.wishlist || [] });
}

// ✅ Add to Wishlist
export async function POST(req) {
    await authDB();
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    const user = await User.findById(userId);
    
    if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
    }

    return NextResponse.json({ message: "Added to wishlist", wishlist: user.wishlist });
}

// ✅ Remove from Wishlist
export async function DELETE(req) {
    await authDB();
    const userId = await getUserIdFromToken(req);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId } = await req.json();
    const user = await User.findById(userId);
    
if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
}

    
    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    return NextResponse.json({ message: "Removed from wishlist", wishlist: user.wishlist });
}
