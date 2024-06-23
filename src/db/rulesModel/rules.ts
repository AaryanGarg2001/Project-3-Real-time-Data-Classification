import mongoose from "mongoose";

const Schema=mongoose.Schema;

const RuleSchema = new Schema({
        userId: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        rule:{
            type:String,
            required: true
        }
})

export const ruleModel = mongoose.model("Rules", RuleSchema)