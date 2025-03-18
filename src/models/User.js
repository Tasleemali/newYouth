import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
 username:String,
email:String,
password:String,
wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "youths" }]

})

const User = mongoose.models.auths || mongoose.model("auths", UserSchema)
export default User