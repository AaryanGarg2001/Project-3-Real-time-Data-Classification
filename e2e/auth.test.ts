import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/main'; 

describe('Authentication Endpoints', () => {
  let token: string;


beforeAll(async () => {

  process.env.NODE_ENV='test'

  await app.ready();
});

afterAll(async () => {
  await mongoose.disconnect();
  await app.close();
});


  it('should register a user successfully', async () => {
    const res = await request(app.server)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('user registration successful');
  });

  it('should log in a user successfully', async () => {
    const res = await request(app.server)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('user login successful');
    token = res.body.data.token;
  });
});
