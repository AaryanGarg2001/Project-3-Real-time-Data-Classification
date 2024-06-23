import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { connectDatabase } from "./db";
import { env } from "./db/env";
import { logger } from "./utils/logger";
import { authenticateJWT } from "./middleware/auth";
import { registerRoutes } from "./auth/route";
import { registerRulesRoutes } from "./rules/routes";
import { evaluateRule } from "./rules/services";

const app= fastify({
    logger:logger
});
async function main() {


    // Protected routes can use the middleware
    // app.addHook('onRequest', authenticateJWT);
    app.addHook('onRequest', async (req: FastifyRequest, reply: FastifyReply) => {
        if (req.routerPath !== '/register' && req.routerPath !== '/login') {
          await authenticateJWT(req, reply);
        }
      });
    
    app.register(registerRoutes);
    app.register(registerRulesRoutes);


    await app.listen({
        port:env.PORT,
        host:env.HOST
    })
    const db= connectDatabase()

}

main();

export{
    app,
    main
}