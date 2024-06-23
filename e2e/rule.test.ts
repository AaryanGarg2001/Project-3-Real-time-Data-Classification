import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/main'; 
describe('Rule Endpoints', () => {
  let token: string;
  let ruleId: string;

  beforeAll(async () => {
    const uri = process.env.MONGO_URI_TEST!;
    await mongoose.connect(uri);

    const res = await request(app)
      .post('/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    token = res.body.data.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await app.close();
  });

  it('should create a rule successfully', async () => {
    const res = await request(app)
      .post('/rules')
      .set('Authorization', `Bearer ${token}`)
      .send({
        rule: 'max(count("a"),count("b"))<10',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Rule created successfully');
    ruleId = res.body.data.rule._id;
  });

  it('should get all rules', async () => {
    const res = await request(app)
      .get('/rules')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.rules).toHaveLength(1);
  });

  it('should update a rule successfully', async () => {
    const res = await request(app)
      .put(`/rules/${ruleId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        rule: 'max(count("a"),count("b"))<5',
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Rule updated successfully');
  });

  it('should delete a rule successfully', async () => {
    const res = await request(app)
      .delete(`/rules/${ruleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Rule deleted successfully');
  });

  it('should evaluate data against a rule', async () => {
    const resCreate = await request(app)
      .post('/rules')
      .set('Authorization', `Bearer ${token}`)
      .send({
        rule: 'max(count("a"),count("b"))<10',
      });

    const rule = resCreate.body.data.rule;

    const resEvaluate = await request(app)
      .post('/rules/evaluate')
      .set('Authorization', `Bearer ${token}`)
      .send({
        rule: rule.rule,
        data: 'aaryan is boss',
      });

    expect(resEvaluate.status).toBe(200);
    expect(resEvaluate.body.data.result).toBe(true);
  });
});
