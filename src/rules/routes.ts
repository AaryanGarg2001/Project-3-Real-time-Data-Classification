
import { FastifyInstance } from 'fastify';
import { createRule, getRules, updateRule, deleteRule } from './controller';
import { authenticateJWT } from '../middleware/auth';

export default async (fastify: FastifyInstance) => {
  fastify.post('/rules', { preHandler: authenticateJWT }, createRule);
  fastify.get('/rules', { preHandler: authenticateJWT }, getRules);
  fastify.put('/rules/:id', { preHandler: authenticateJWT }, updateRule);
  fastify.delete('/rules/:id', { preHandler: authenticateJWT }, deleteRule);
};