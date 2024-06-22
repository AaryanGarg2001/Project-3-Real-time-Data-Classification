import fastify, { FastifyInstance } from "fastify";
import { logger } from "./logger";
import { registerRoutes } from "../auth/route";
import { registerRulesRoutes } from "../rules/routes";
import { authenticateJWT } from "../middleware/auth";

export async function buildServer() {

    const app= fastify({
        logger:logger
    });

    // Protected routes can use the middleware
    app.addHook('onRequest', authenticateJWT);
    
    app.register(registerRoutes);
    app.register(registerRulesRoutes);

    return app;
}