import { connectDatabase } from "./db";
import { env } from "./db/env";
import { logger } from "./utils/logger";
import { buildServer } from "./utils/server";

async function escapeProgram({
    app,
}:{
    app: Awaited <ReturnType<typeof buildServer>>;
}){
    await app.close();
}

async function main() {

    const app=await buildServer();

    await app.listen({
        port:env.PORT,
        host:env.HOST
    },(err,address)=>{
        if(err){
            logger.error(err);
            escapeProgram({app});
        }
    })
    const db= connectDatabase()
}

main();