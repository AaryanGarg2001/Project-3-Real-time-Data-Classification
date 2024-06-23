import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "./env";

export async function connectDatabase() {
    const db = await mongoose.connect(env.DATABASE_CONNECTION,).then(()=>{
        logger.info("database up and running")
    }).catch((err)=>{
        logger.error(err);
    })
    
}