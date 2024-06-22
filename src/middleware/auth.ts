import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'SignzyRocks';

export const authenticateJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    reply.code(403).send('Forbidden');
    return;
  }

  try {
    const user = jwt.verify(token, secret);
    (request as any).user = user;
  } catch (e) {
    reply.code(403).send('Forbidden');
  }
};