import fastify, { FastifyInstance } from "fastify";
import { logger } from "./logger";
import { registerRoutes } from "../auth/route";

export async function buildServer() {

    const app= fastify({
        logger:logger
    });


    
    app.register(registerRoutes);


    return app;
}