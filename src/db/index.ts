import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { env } from "./env";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectDatabase() {

    let mongoServer: MongoMemoryServer;
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    if(process.env.NODE_ENV === 'test')
        console.log("testing")

    const uri = process.env.NODE_ENV === 'test' ? mongoUri : env.DATABASE_CONNECTION;
    const db = await mongoose.connect(uri,).then(()=>{
        logger.info("database up and running")
    }).catch((err)=>{
        logger.error(err);
    })
    
}