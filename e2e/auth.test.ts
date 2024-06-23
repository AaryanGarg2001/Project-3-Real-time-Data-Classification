import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/main'; // Adjust the path as necessary

describe('Authentication Endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const uri = process.env.MONGO_URI_TEST!;
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await app.close();
  });

  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('user registration successful');
  });

  it('should log in a user successfully', async () => {
    const res = await request(app)
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
