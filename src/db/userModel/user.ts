import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
    // posts:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Post"
    // }],
    // comments:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Comment"
    // }],
    // like:[{
    //     type:Schema.Types.ObjectId,
    //     ref:"Like"
    // }]

})

export const userModel = mongoose.model("User", UserSchema)