import { authDB } from "@/database/authDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    await authDB();
    const { username, email, password } = await req.json();

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const user = await User.create({ username, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered successfully", userId: user._id });
}