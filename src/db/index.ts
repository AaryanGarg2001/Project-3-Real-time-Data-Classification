import mongoose from "mongoose";
import { logger } from "../utils/logger";
// import { env } from "./env";

export async function connectDatabase() {
    const uri = "mongodb+srv://Aaryan:qwerty14@createapi.nyyddrr.mongodb.net/ruleBasedDsl?retryWrites=true&w=majority&appName=CreateAPI"
    const db = await mongoose.connect(uri).then(()=>{
        logger.info("database up and running")
    }).catch((err)=>{
        logger.error(err);
    })
    
}