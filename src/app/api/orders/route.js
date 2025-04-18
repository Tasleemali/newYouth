import { authDB } from "@/database/authDB";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export async function POST(req) {
    await authDB()
    try {
        const {userId} = await req.json()
        if(!userId){
            return NextResponse.json({success:false , message:"userid is missing"} ,{status:400})
        }
        const orders = await  Order.find({ userId: new mongoose.Types.ObjectId(userId)})
         return NextResponse.json({success:true , orders})
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({success:false , message: error.message},{status:500})
    }

    
}