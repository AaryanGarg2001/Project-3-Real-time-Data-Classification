// src/routes/ruleRoutes.ts

import { FastifyInstance } from 'fastify';
import { createRule, getRules, updateRule, deleteRule, evaluateData } from './controller';

export async function registerRulesRoutes(fastify: FastifyInstance) {
    fastify.post('/rules', createRule);
    fastify.get('/rules', getRules);
    fastify.put('/rules/:id', updateRule);
    fastify.delete('/rules/:id', deleteRule);
    fastify.post('/rules/evaluate', evaluateData);
};
